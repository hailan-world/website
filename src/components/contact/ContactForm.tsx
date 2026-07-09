"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { site } from "@/lib/site";

type FormDict = Dictionary["contactPage"]["form"];

const fieldClasses =
  "w-full rounded-xl border border-ink-950/12 bg-white px-4.5 py-3.5 text-[15px] text-ink-950 placeholder:text-mist-400 transition-colors duration-300 focus:border-azure-500 focus:outline-none";

/**
 * Static-site friendly inquiry form: composes a structured email in the
 * visitor's mail client. Swap handleSubmit for an API route or form service
 * when a backend is available.
 */
export function ContactForm({
  t,
  productNames,
}: {
  t: FormDict;
  productNames: string[];
}) {
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
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-medium text-ink-950"
          >
            {t.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-company"
            className="mb-2 block text-sm font-medium text-ink-950"
          >
            {t.company}
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder={t.companyPlaceholder}
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-medium text-ink-950"
          >
            {t.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-country"
            className="mb-2 block text-sm font-medium text-ink-950"
          >
            {t.country}
          </label>
          <input
            id="contact-country"
            name="country"
            type="text"
            required
            autoComplete="country-name"
            placeholder={t.countryPlaceholder}
            className={fieldClasses}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="contact-inquiry"
            className="mb-2 block text-sm font-medium text-ink-950"
          >
            {t.inquiry}
          </label>
          <select
            id="contact-inquiry"
            name="inquiry"
            required
            defaultValue={t.inquiryTypes[0]}
            className={fieldClasses}
          >
            {t.inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 block text-sm font-medium text-ink-950">
          {t.productsInterest}
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {productNames.map((name) => (
            <label
              key={name}
              className="flex cursor-pointer items-center gap-2.5 rounded-full border border-ink-950/12 px-4 py-2 text-sm text-mist-600 transition-colors duration-300 has-checked:border-azure-600 has-checked:bg-azure-600/5 has-checked:text-ink-950"
            >
              <input
                type="checkbox"
                name="products"
                value={name}
                className="h-3.5 w-3.5 accent-azure-600"
              />
              {name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium text-ink-950"
        >
          {t.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={t.messagePlaceholder}
          className={fieldClasses}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button type="submit" arrow>
          {t.submit}
        </Button>
        <p className="text-[13px] leading-relaxed text-mist-500">
          {t.note}{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-ink-950 underline decoration-ink-950/25 underline-offset-4 hover:decoration-azure-600"
          >
            {site.email}
          </a>
        </p>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {submitted ? t.status : ""}
      </p>
    </form>
  );
}
