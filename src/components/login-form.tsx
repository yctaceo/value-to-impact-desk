"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/client";
import { roleCards } from "@/lib/seed-data";
import { FieldLabel } from "./ui";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const configured = hasSupabaseEnv();

  async function signIn() {
    if (!configured) {
      setMessage("Supabase env가 없어 데모 모드입니다. 아래 역할별 대시보드로 이동하세요.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setMessage(
      error ? error.message : "Magic link를 이메일로 보냈습니다. Supabase 설정을 확인하세요.",
    );
  }

  return (
    <div className="panel p-6">
      <div className="grid gap-4">
        <FieldLabel label="Email">
          <input
            className="field"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </FieldLabel>
        <button
          onClick={signIn}
          className="rounded-md bg-[var(--ink)] px-5 py-3 font-semibold text-white"
        >
          Send Magic Link
        </button>
        {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
      </div>
      {!configured ? (
        <div className="mt-6 rounded-md bg-[#fbfaf8] p-4">
          <p className="text-sm font-semibold">Demo role shortcuts</p>
          <div className="mt-3 grid gap-2">
            {roleCards.map((card) => (
              <Link
                key={card.role}
                href={card.path}
                className="rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm"
              >
                {card.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
