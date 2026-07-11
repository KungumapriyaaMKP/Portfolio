"use client";

import { useForm, ValidationError } from "@formspree/react";

const FORMSPREE_FORM_ID = "mzdlnlwo";

export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <div className="border border-accent/30 bg-accent/10 px-6 py-8 text-center">
        <p className="text-sm font-semibold text-accent">
          Thanks, your message is on its way.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full text-left"
      aria-label="Contact form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-xs font-semibold uppercase tracking-widest text-foreground"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block font-mono text-xs font-semibold uppercase tracking-widest text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent"
            placeholder="you@example.com"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="mt-1 block text-xs text-red-400"
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="block font-mono text-xs font-semibold uppercase tracking-widest text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-none border border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent"
          placeholder="Drop a message"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="mt-1 block text-xs text-red-400"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state.submitting}
          className="bg-accent px-6 py-3 text-sm font-bold text-[#1a0800] transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state.submitting ? "Sending…" : "Send Message"}
        </button>
        {state.errors && state.errors.getFormErrors().length > 0 && (
          <span className="text-sm text-red-400">
            Something went wrong, please try again.
          </span>
        )}
      </div>
    </form>
  );
}
