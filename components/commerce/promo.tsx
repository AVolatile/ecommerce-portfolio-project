"use client";
import { useState } from "react";

export function Promo({
  value,
  onApply,
}: {
  value: string;
  onApply: (v: string) => void;
}) {
  const [entry, setEntry] = useState(value);
  const [message, setMessage] = useState("");
  return (
    <form
      className="promo-form"
      onSubmit={(e) => {
        e.preventDefault();
        const code = entry.trim().toUpperCase();
        if (code === "FIRSTUSE") {
          onApply(code);
          setMessage("FIRSTUSE applied: $15 off orders of $100 or more.");
        } else if (!code) {
          onApply("");
          setMessage("Promo code cleared.");
        } else {
          onApply("");
          setMessage(
            "This code isn’t part of the demo. Try FIRSTUSE on orders of $100 or more.",
          );
        }
      }}
    >
      <label htmlFor="promo">A code, if you have one.</label>
      <div>
        <input
          id="promo"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Promo code"
        />
        <button type="submit">Apply</button>
      </div>
      <p className="promo-message" role="status">
        {message}
      </p>
    </form>
  );
}
