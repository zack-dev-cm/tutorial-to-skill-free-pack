"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Updates are sent only when a real release or validation note changes.");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Submitting...");

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setMessage(data.error ?? "Subscription failed. Please try again later.");
      return;
    }

    setStatus("success");
    setEmail("");
    setMessage(data.message ?? "Subscribed. You will receive release updates only.");
  }

  return (
    <form className="subscribe-form" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="email">Email address</label>
      <input
        id="email"
        type="email"
        required
        value={email}
        placeholder="you@example.com"
        autoComplete="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <button disabled={status === "loading"} type="submit">{status === "loading" ? "Subscribing" : "Subscribe"}</button>
      <p className={`form-note ${status === "error" ? "error" : ""}`} aria-live="polite">{message}</p>
    </form>
  );
}

