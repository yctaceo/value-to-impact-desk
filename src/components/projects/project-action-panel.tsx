"use client";

import { Check, Download, Heart, Plus } from "lucide-react";
import { useState } from "react";

function useDemoAction() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState("");

  function run(label: string) {
    setPending(label);
    setMessage("");
    window.setTimeout(() => {
      setPending("");
      setMessage(`Demo action completed: ${label}`);
    }, 450);
  }

  return { message, pending, run };
}

export function ProjectActionPanel({ projectSlug }: { projectSlug: string }) {
  const { message, pending, run } = useDemoAction();

  function addToStorage(key: string, label: string) {
    const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
    const next = current.includes(projectSlug) ? current : [...current, projectSlug];
    window.localStorage.setItem(key, JSON.stringify(next));
    run(label);
  }

  return (
    <div className="panel sticky top-24 p-5">
      <p className="text-sm font-semibold text-[var(--muted)]">Project action</p>
      <h2 className="mt-2 text-xl font-semibold">Sponsor, invest, or prepare a CSR report</h2>
      <div className="mt-5 grid gap-2">
        <button
          type="button"
          onClick={() => addToStorage("vti:portfolio", "Add to company portfolio")}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--ink)] px-3 py-3 text-sm font-semibold text-white"
        >
          <Plus size={16} />
          {pending === "Add to company portfolio" ? "Saving..." : "Add to portfolio"}
        </button>
        <button
          type="button"
          onClick={() => addToStorage("vti:favorites", "Save project")}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 py-3 text-sm font-semibold"
        >
          <Heart size={16} />
          Save project
        </button>
        <button
          type="button"
          onClick={() => run("Download sponsor evidence report")}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 py-3 text-sm font-semibold"
        >
          <Download size={16} />
          Download evidence report
        </button>
      </div>
      {message ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-[var(--success-bg)] px-3 py-2 text-xs font-semibold text-[var(--ink)]">
          <Check size={14} />
          {message}
        </p>
      ) : null}
      <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
        This demo does not process payments or investments. Backend integration will connect
        these actions to Supabase auth, portfolio records, and report generation.
      </p>
    </div>
  );
}
