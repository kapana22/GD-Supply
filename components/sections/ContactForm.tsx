"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type FormState = "idle" | "loading" | "sent" | "error";

export function ContactForm() {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-gd-surface/55 p-6 shadow-2xl shadow-black/40 backdrop-blur md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="name" label={t("fields.name")} required />
        <Input name="phone" label={t("fields.phone")} required />
        <Input name="email" label={t("fields.email")} type="email" />
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            {t("fields.service")}
          </label>
          <select
            name="service"
            className="w-full rounded-2xl border border-white/10 bg-gd-panel/70 px-4 py-3 text-sm font-semibold text-white shadow-inner shadow-black/30 outline-none"
            defaultValue=""
            required
          >
            <option value="" disabled>
              აირჩიე
            </option>
            {(tCalc.raw("service_options") as string[]).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <Input name="area" label={t("fields.area")} type="number" />

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            {t("fields.message")}
          </label>
          <textarea
            name="message"
            rows={5}
            required
            className="w-full rounded-2xl border border-white/10 bg-gd-panel/70 px-4 py-3 text-sm text-white shadow-inner shadow-black/30 outline-none placeholder:text-white/35"
            placeholder="მოგვწერე დეტალები: ობიექტი, პრობლემა, სასურველი ვადა…"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/55">
          გაგზავნით ვადასტურებ, რომ შემიძლია დამიკავშირდეთ მითითებულ ნომერზე.
        </p>
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-primary-green px-6 py-3 text-sm font-semibold text-white shadow-glow-green transition hover:translate-y-0.5 disabled:opacity-60"
        >
          {state === "loading"
            ? "იგზავნება..."
            : state === "sent"
            ? "გაიგზავნა ✓"
            : t("fields.submit")}
        </button>
      </div>
    </form>
  );
}

function Input({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-gd-panel/70 px-4 py-3 text-sm text-white shadow-inner shadow-black/30 outline-none placeholder:text-white/35"
      />
    </div>
  );
}

