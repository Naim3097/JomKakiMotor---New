"use client";

import { useState } from "react";
import { ChevronDown } from "./icons";
import { EMAIL } from "@/data/site";

/**
 * Contact form per R1 slide 42. Currently composes a prefilled email to
 * enquiries@ (no backend required); swap the submit handler for a Resend/API
 * route before launch if server-side delivery is preferred.
 */
export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website enquiry — ${form.branch || "General"} (${form.name})`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Branch: ${form.branch}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none";

  return (
    <form onSubmit={submit} className="space-y-4">
      <p className="text-sm text-muted">
        Have a question? Drop us a message here and we will get back to you as soon
        as possible!
      </p>
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-ink">
          Name<span className="text-brand">*</span>
        </label>
        <input id="cf-name" required value={form.name} onChange={set("name")} placeholder="Enter your full name" className={field} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-ink">
            Email<span className="text-brand">*</span>
          </label>
          <input id="cf-email" type="email" required value={form.email} onChange={set("email")} placeholder="Enter your email address" className={field} />
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-ink">
            Phone Number<span className="text-brand">*</span>
          </label>
          <input id="cf-phone" type="tel" required value={form.phone} onChange={set("phone")} placeholder="Enter your phone number" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-branch" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-ink">
          Select Branch<span className="text-brand">*</span>
        </label>
        <span className="relative block">
          <select
            id="cf-branch"
            required
            value={form.branch}
            onChange={set("branch")}
            className={`${field} appearance-none pr-10`}
          >
            <option value="" disabled>
              Choose a branch
            </option>
            <option>KL &amp; Selangor</option>
            <option>Kuching</option>
            <option>Bintulu</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </span>
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-ink">
          Your Message<span className="text-brand">*</span>
        </label>
        <textarea id="cf-message" required rows={4} value={form.message} onChange={set("message")} placeholder="Type your message or inquiry here" className={field} />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-brand px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-deep sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}
