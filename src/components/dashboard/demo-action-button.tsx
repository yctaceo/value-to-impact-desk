"use client";

import { Check } from "lucide-react";
import { useState } from "react";

export function DemoActionButton({
  label,
  doneLabel = "Demo action complete",
  variant = "secondary",
}: {
  label: string;
  doneLabel?: string;
  variant?: "primary" | "secondary";
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  function run() {
    setState("loading");
    window.setTimeout(() => setState("done"), 450);
  }

  return (
    <button
      type="button"
      onClick={run}
      className={
        variant === "primary"
          ? "inline-flex items-center justify-center gap-2 rounded-md bg-[var(--ink)] px-3 py-2 text-sm font-semibold text-white"
          : "inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold"
      }
    >
      {state === "done" ? <Check size={15} /> : null}
      {state === "loading" ? "Working..." : state === "done" ? doneLabel : label}
    </button>
  );
}
