"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { site } from "@/lib/site";

const inquiryTypes = [
  "Distribution partnership",
  "OEM / private label program",
  "Commercial project supply",
  "Samples & documentation",
  "Other",
];

const fieldClasses =
  "w-full rounded-xl border border-ink-950/12 bg-white px-4.5 py-3.5 text-[15px] text-ink-950 placeholder:text-mist-400 transition-colors duration-300 focus:border-azure-500 focus:outline-none";

/**
 * Static-site friendly inquiry form: composes a structured email in the
 * visitor's mail client. Swap handleSubmit for an API route or form service
 * when a backend is available.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const subject = `Inquiry — ${data.get("inquiry")} (${data.get("company")})`;
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Country / market: ${data.get("country")}`,
      `Email: ${data.get("email")}`,
      `Inquiry type: ${data.get("inquiry")}`,
      `Products of interest: ${data.getAll("products").join(", ") || "—"}`,
      "",
      "Message:",
      String(data.get("message")),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-medium text-ink-950"
          >
            Full name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-company"
            className="mb-2 block text-sm font-medium text-ink-950"
          >
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="Company Ltd."
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-medium text-ink-950"
          >
            Work email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-country"
            className="mb-2 block text-sm font-medium text-ink-950"
          >
            Country / market
          </label>
          <input
            id="contact-country"
            name="country"
            type="text"
            required
            autoComplete="country-name"
            placeholder="Netherlands"
            className={fieldClasses}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="contact-inquiry"
            className="mb-2 block text-sm font-medium text-ink-950"
          >
            Inquiry type
          </label>
          <select
            id="contact-inquiry"
            name="inquiry"
            required
            defaultValue={inquiryTypes[0]}
            className={fieldClasses}
          >
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 block text-sm font-medium text-ink-950">
          Products of interest
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {products.map((product) => (
            <label
              key={product.slug}
              className="flex cursor-pointer items-center gap-2.5 rounded-full border border-ink-950/12 px-4 py-2 text-sm text-mist-600 transition-colors duration-300 has-checked:border-azure-600 has-checked:bg-azure-600/5 has-checked:text-ink-950"
            >
              <input
                type="checkbox"
                name="products"
                value={product.name}
                className="h-3.5 w-3.5 accent-azure-600"
              />
              {product.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium text-ink-950"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your market, volumes, target constructions or project…"
          className={fieldClasses}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button type="submit" arrow>
          Send inquiry
        </Button>
        <p className="text-[13px] leading-relaxed text-mist-500">
          Opens your email client — or write to us directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-ink-950 underline decoration-ink-950/25 underline-offset-4 hover:decoration-azure-600"
          >
            {site.email}
          </a>
        </p>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {submitted ? "Your email draft has been opened in your mail client." : ""}
      </p>
    </form>
  );
}
