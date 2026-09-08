"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditorLoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const response = await fetch("/api/editor-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    setSubmitting(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Login failed.");
      return;
    }
    router.push("/editor");
    router.refresh();
  }

  return (
    <main>
      <section className="wrap" style={{ paddingTop: 60, textAlign: "center" }}>
        <h1 style={{ fontSize: 32, color: "var(--accent)" }}>
          Editor Login
        </h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "32px auto 0", textAlign: "left" }}>
          <label className="mono" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Email
          </label>
          <input
            type="email"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
            className="card"
            style={{ width: "100%", padding: "12px 14px", marginTop: 8, fontSize: 15, background: "var(--card)" }}
          />
          <label className="mono" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 16, display: "block" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="card"
            style={{ width: "100%", padding: "12px 14px", marginTop: 8, fontSize: 15, background: "var(--card)" }}
          />
          {error ? (
            <p className="mono" style={{ color: "var(--accent)", fontSize: 12, marginTop: 10 }}>
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="btn"
            style={{ width: "100%", marginTop: 16 }}
          >
            {submitting ? "Checking…" : "Log in"}
          </button>
        </form>
        <p style={{ marginTop: 20 }}>
          <Link href="/editor/guide" className="mono" style={{ fontSize: 12, textDecoration: "underline" }}>
            New here? Read how this works →
          </Link>
        </p>
      </section>
    </main>
  );
}
