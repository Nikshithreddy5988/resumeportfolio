"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const blockClipboard = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const email = `${data.get("email") ?? ""}` as any;
    const confirmEmail = `${data.get("confirmEmail") ?? ""}` as any;

    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
      setStatus("error");
      setErrorMsg("Emails do not match. Please re-enter them.");
      return;
    }

    data.delete("confirmEmail");

    try {
      const response = await fetch("https://formspree.io/f/maqdzqzg", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <div className="noteHeader">
        <span className="notePin" />
        <h2>Send a message</h2>
      </div>
      <div className="formGrid">
        <label className="field">
          Name
          <input className="input" name="name" placeholder="Your name" required />
        </label>
        <label className="field">
          Email
          <input
            className="input"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            autoComplete="email"
          />
        </label>
        <label className="field fieldFull">
          Confirm Email
          <input
            className="input"
            type="email"
            name="confirmEmail"
            placeholder="Re-enter your email"
            required
            autoComplete="off"
            onPaste={blockClipboard}
            onCopy={blockClipboard}
            onCut={blockClipboard}
            spellCheck={false}
          />
        </label>
      </div>

      <label className="field">
        Message
        <textarea
          className="textarea"
          name="message"
          rows={6}
          placeholder="Tell me what you want to build or discuss."
          required
        />
      </label>

      <button className="sendButton" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "idle" && <p className="statusLine">This form sends directly to my email.</p>}
      {status === "sent" && <p className="statusLine successLine">Message sent successfully.</p>}
      {status === "error" && <p className="statusLine errorLine">{errorMsg}</p>}
    </form>
  );
}
