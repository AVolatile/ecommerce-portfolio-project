"use client";
import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  EMPTY_STATE,
  parseState,
  isAvailable,
  lineKey,
  type CartLine,
  type CommerceState,
  type Order,
} from "@/lib/commerce";
import { getProduct } from "@/lib/catalog";
let snapshot = EMPTY_STATE;
let ready = false;
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
function getSnapshot() {
  if (!ready && typeof window !== "undefined") {
    ready = true;
    try {
      snapshot = parseState(localStorage.getItem("velt-commerce-v1"));
    } catch {
      snapshot = EMPTY_STATE;
    }
  }
  return snapshot;
}
function commit(next: CommerceState) {
  snapshot = next;
  try {
    localStorage.setItem("velt-commerce-v1", JSON.stringify(next));
  } catch {}
  listeners.forEach((fn) => fn());
}
interface Store {
  state: CommerceState;
  notice: string;
  notify: (message: string) => void;
  drawer: boolean;
  setDrawer: (v: boolean) => void;
  add: (line: CartLine) => void;
  quantity: (key: string, q: number) => void;
  remove: (key: string) => void;
  save: (slug: string) => void;
  compare: (slug: string) => void;
  join: () => void;
  profile: (name: string, email: string) => void;
  logout: () => void;
  place: (order: Order) => void;
  preferences: (values: string[]) => void;
  promo: (code: string) => void;
}
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_STATE);
  const [notice, setNotice] = useState("");
  const [drawer, setDrawer] = useState(false);
  const notify = useCallback((m: string) => setNotice(m), []);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "velt-commerce-v1") {
        snapshot = parseState(e.newValue);
        listeners.forEach((fn) => fn());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const add = (line: CartLine) => {
    const p = getProduct(line.slug);
    if (!p || !isAvailable(p)) {
      notify("This item is not available to add.");
      return;
    }
    if (!p.colors.includes(line.color)) return;
    const old = snapshot.cart.find((l) => lineKey(l) === lineKey(line));
    if ((old?.quantity || 0) + line.quantity > 10) {
      notify("The demo allows up to 10 of each variant.");
      return;
    }
    const cart = old
      ? snapshot.cart.map((l) =>
          lineKey(l) === lineKey(line)
            ? { ...l, quantity: l.quantity + line.quantity }
            : l,
        )
      : [...snapshot.cart, line];
    commit({ ...snapshot, cart });
    notify(`${p.name} added to your bag.`);
    setDrawer(true);
  };
  return (
    <Context.Provider
      value={{
        state,
        notice,
        notify,
        drawer,
        setDrawer,
        add,
        quantity: (key, q) => {
          if (!Number.isInteger(q) || q < 1 || q > 10) return;
          commit({
            ...snapshot,
            cart: snapshot.cart.map((l) =>
              lineKey(l) === key ? { ...l, quantity: q } : l,
            ),
          });
        },
        remove: (key) => {
          commit({
            ...snapshot,
            cart: snapshot.cart.filter((l) => lineKey(l) !== key),
          });
          notify("Item removed from your bag.");
        },
        save: (slug) => {
          const has = snapshot.wishlist.includes(slug);
          commit({
            ...snapshot,
            wishlist: has
              ? snapshot.wishlist.filter((v) => v !== slug)
              : [...snapshot.wishlist, slug],
          });
          notify(has ? "Removed from saved items." : "Saved for another day.");
        },
        compare: (slug) => {
          if (snapshot.compare.includes(slug)) {
            commit({
              ...snapshot,
              compare: snapshot.compare.filter((v) => v !== slug),
            });
            return;
          }
          if (snapshot.compare.length >= 3) {
            notify("Compare up to three products. Remove one to add another.");
            return;
          }
          commit({ ...snapshot, compare: [...snapshot.compare, slug] });
          notify("Added to comparison.");
        },
        join: () => {
          commit({
            ...snapshot,
            member: true,
            memberSince: new Date().toISOString(),
          });
          notify("Welcome to In Use. Your concept membership is active.");
        },
        profile: (name, email) => {
          commit({ ...snapshot, profile: { name, email } });
          notify("Your local demo profile is ready.");
        },
        logout: () => {
          commit({ ...snapshot, profile: null });
          notify("Signed out of the local demo.");
        },
        place: (order) => {
          commit({
            ...snapshot,
            orders: [order, ...snapshot.orders],
            cart: [],
            promo: "",
          });
          setDrawer(false);
        },
        promo: (code) => {
          commit({ ...snapshot, promo: code });
        },
        preferences: (values) => {
          commit({ ...snapshot, preferences: values });
          notify("Your preferences are saved on this device.");
        },
      }}
    >
      {children}
      <div
        className={`toast ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice}
      </div>
    </Context.Provider>
  );
}
export function useStore() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Store provider missing");
  return ctx;
}
