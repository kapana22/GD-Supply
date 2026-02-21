"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type FormState = "idle" | "loading" | "sent" | "error";

export function ContactSection() {
  const t = useTranslations("contact");
  const tCalc = useTranslations("calculator");

  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      area: (form.elements.namedItem("area") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    setState("loading");
    setError("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setState("sent");
      form.reset();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body?.error || "შეტყობინება ვერ გაიგზავნა");
      setState("error");
    }
  }

  const phone = t("alt.phone");
  const email = t("alt.email");
  const location = t("alt.location");
  const hours = t.raw("hours") as string[];

  return (
    <section id="contact" className="bg-gd-surface py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[420px_1fr] lg:gap-14">
          <div className="rounded-[20px] border border-white/10 bg-primary-navy p-8 shadow-elevated md:p-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gd-muted">{t("subtitle")}</p>

            <div className="mt-8 divide-y divide-white/10">
              <ContactItem
                icon={<PhoneIcon />}
                label="ტელეფონი"
                value={phone}
                href={`tel:${phone.replaceAll(" ", "")}`}
              />
              <ContactItem
                icon={<MailIcon />}
                label="ელ-ფოსტა"
                value={email}
                href={`mailto:${email}`}
              />
              <ContactItem icon={<PinIcon />} label="ლოკაცია" value={location} />
              <div className="flex gap-4 py-5">
                <div className="grid h-11 w-11 flex-none place-items-center rounded-[10px] border border-primary-green/30 bg-primary-green/15 text-white/85">
                  <ClockIcon />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-extrabold uppercase tracking-[0.08em] text-primary-green">
                    სამუშაო საათები
                  </span>
                  <div className="mt-1 space-y-1 text-sm font-semibold text-white/90">
                    {hours.map((h) => (
                      <div key={h} className="text-white/80">
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <span className="block text-[11px] font-extrabold uppercase tracking-[0.08em] text-primary-green">
                სოციალური
              </span>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href="https://facebook.com/GDSupply1"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-primary-green hover:bg-primary-green/10"
                >
                  <FacebookIcon /> Facebook
                </a>
                <a
                  href="https://linkedin.com/company/gd-supply"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-primary-green hover:bg-primary-green/10"
                >
                  <LinkedInIcon /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-primary-green/20 bg-gd-result p-8 shadow-elevated md:p-10">
            <h3 className="text-xl font-extrabold text-white md:text-2xl">
              გამოგვიგზავნე განცხადება
            </h3>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="name"
                    required
                    placeholder={t("fields.name")}
                    className="w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/35 transition focus:border-primary-green focus:bg-primary-green/5"
                  />
                  <input
                    name="phone"
                    required
                    placeholder={t("fields.phone")}
                    className="w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/35 transition focus:border-primary-green focus:bg-primary-green/5"
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  placeholder={t("fields.email")}
                  className="w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/35 transition focus:border-primary-green focus:bg-primary-green/5"
                />

                <select
                  name="service"
                  required
                  defaultValue=""
                  className="w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-[15px] font-semibold text-white outline-none transition focus:border-primary-green focus:bg-primary-green/5"
                >
                  <option value="" disabled>
                    {t("fields.service")}
                  </option>
                  {(tCalc.raw("service_options") as string[]).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <input
                  name="area"
                  placeholder={t("fields.area")}
                  className="w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/35 transition focus:border-primary-green focus:bg-primary-green/5"
                />

                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder={t("fields.message")}
                  className="w-full resize-none rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/35 transition focus:border-primary-green focus:bg-primary-green/5"
                />

                {error ? <p className="text-sm text-red-400">{error}</p> : null}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full rounded-[10px] bg-primary-green px-6 py-4 text-base font-semibold text-white shadow-glow-green transition hover:brightness-110 disabled:opacity-60"
                >
                  {state === "loading"
                    ? "იგზავნება..."
                    : state === "sent"
                      ? "გაიგზავნა ✓"
                      : t("fields.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex gap-4 py-5">
      <div className="grid h-11 w-11 flex-none place-items-center rounded-[10px] border border-primary-green/30 bg-primary-green/15 text-white/85">
        {icon}
      </div>
      <div className="min-w-0">
        <span className="block text-[11px] font-extrabold uppercase tracking-[0.08em] text-primary-green">
          {label}
        </span>
        <span className="mt-1 block text-sm font-semibold text-white/90">{value}</span>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block transition hover:brightness-110">
      {content}
    </a>
  ) : (
    content
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 11 19.79 19.79 0 0 1 .12 2.38 2 2 0 0 1 2.11 0h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 14.92Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4h16v16H4V4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 9h3V6h-3c-2 0-4 2-4 4v3H7v3h3v6h3v-6h3l1-3h-4v-3c0-.5.5-1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9H3v12h3V9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M21 21v-7a4 4 0 0 0-4-4 4 4 0 0 0-3 1.4V9h-3v12h3v-6.3a2.7 2.7 0 0 1 2.7-2.7A2.3 2.3 0 0 1 19 14.3V21h2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
