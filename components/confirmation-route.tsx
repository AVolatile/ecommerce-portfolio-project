"use client";
import { useStore } from "./store";
import { Confirmation } from "./purchase";
import { PageIntro, EmptyState } from "./ui";
export function ConfirmationRoute() {
  const { state } = useStore();
  return state.orders[0] ? (
    <Confirmation order={state.orders[0]} />
  ) : (
    <>
      <PageIntro kicker="Your order" title="A good start is ahead." />
      <EmptyState
        title="No demo order yet."
        body="Complete checkout to preview your confirmation."
      />
    </>
  );
}
