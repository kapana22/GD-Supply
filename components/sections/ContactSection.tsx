"use client";

import { useState } from "react";
import {
  Clock,
  EnvelopeSimple,
  FacebookLogo,
  LinkedinLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { WhatsAppIcon as BrandWhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type FormState = "idle" | "loading" | "sent" | "error";
const GENERIC_ERROR_MESSAGE = "შეცდომა, სცადე თავიდან";

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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("sent");
        form.reset();
        return;
      }

      setError(GENERIC_ERROR_MESSAGE);
      setState("error");
    } catch {
      setError(GENERIC_ERROR_MESSAGE);
      setState("error");
    }
  }

  const phone = t("alt.phone");
  const phoneSecondary = t("alt.phone_secondary");
  const email = t("alt.email");
  const location = t("alt.location");
  const whatsappNumber = t("alt.whatsapp");
  const hours = t.raw("hours") as string[];
  const submitLabel = t("fields.submit");
  const waPrimaryHref = "https://wa.me/995599705697?text=გამარჯობა GD Supply";
  const waSecondaryHref = "https://wa.me/995555656503?text=გამარჯობა GD Supply";

  return (
    <section id="contact" className="bg-gd-surface py-[52px] md:py-[84px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid items-stretch gap-6 lg:grid-cols-[470px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[500px_minmax(0,1fr)] xl:gap-10">
          <div className="flex h-full flex-col rounded-[20px] border border-white/10 bg-primary-navy p-7 shadow-elevated md:p-8">
            <h2 className="tt-heading-lg text-3xl font-extrabold text-white md:text-4xl">
              {t("title")}
            </h2>
            <p className="tt-detail mt-3 text-base leading-relaxed text-gd-muted">{t("subtitle")}</p>

            <div className="mt-6 divide-y divide-white/10">
              <ContactItem
                icon={<PhoneIcon />}
                label="ტელეფონი"
                value={phone}
                href={`tel:${phone.replaceAll(" ", "")}`}
              />
              <ContactItem
                icon={<PhoneIcon />}
                label="დამატებითი ნომერი"
                value={phoneSecondary}
                href={`tel:${phoneSecondary.replaceAll(" ", "")}`}
              />
              <ContactItem
                icon={<MailIcon />}
                label="ელ-ფოსტა"
                value={email}
                href={`mailto:${email}`}
              />
              <ContactItem icon={<PinIcon />} label="ლოკაცია" value={location} />
              <div className="flex gap-4 py-4">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] border border-primary-green/30 bg-primary-green/15 text-white/85">
                  <ClockIcon />
                </div>
                <div className="min-w-0">
                    <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-primary-green">
                      სამუშაო საათები
                    </span>
                  <div className="mt-1 space-y-0.5 text-sm font-semibold text-white/90">
                    {hours.map((h) => (
                      <div key={h} className="text-white/80">
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div>
                <span className="tt-label block text-[11px] font-extrabold uppercase tracking-[0.08em] text-primary-green">
                  WhatsApp
                </span>
                <div className="mt-2.5 grid gap-2.5">
                  <a
                    href={waPrimaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="tt-ui flex items-center justify-between gap-3 rounded-lg border border-primary-green px-3 py-2.5 text-sm font-semibold text-white transition hover:border-primary-green hover:bg-primary-green/90"
                    style={{ backgroundColor: "#176D48" }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/12 ring-1 ring-white/10">
                        <WhatsAppIcon />
                      </span>
                      <span>WhatsApp</span>
                    </span>
                    <span className="font-sans text-[13px] font-bold tabular-nums whitespace-nowrap">
                      {phone}
                    </span>
                  </a>
                  <a
                    href={waSecondaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="tt-ui flex items-center justify-between gap-3 rounded-lg border border-primary-green px-3 py-2.5 text-sm font-semibold text-white transition hover:border-primary-green hover:bg-primary-green/90"
                    style={{ backgroundColor: "#176D48" }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/12 ring-1 ring-white/10">
                        <WhatsAppIcon />
                      </span>
                      <span>WhatsApp</span>
                    </span>
                    <span className="font-sans text-[13px] font-bold tabular-nums whitespace-nowrap">
                      {whatsappNumber}
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-5">
                <span className="tt-label block text-[11px] font-extrabold uppercase tracking-[0.08em] text-primary-green">
                  სოციალური
                </span>
                <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                  <a
                    href="https://facebook.com/GDSupply1"
                    className="tt-ui inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-primary-green hover:bg-primary-green/10"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                      <FacebookIcon />
                    </span>
                    Facebook
                  </a>
                  <a
                    href="https://linkedin.com/company/gd-supply"
                    className="tt-ui inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-primary-green hover:bg-primary-green/10"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                      <LinkedInIcon />
                    </span>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col rounded-[20px] border border-primary-green/20 bg-gd-result p-7 shadow-elevated md:p-8">
            <h3 className="tt-heading-md text-xl font-extrabold text-white md:text-2xl">
              გამოგვიგზავნე განცხადება
            </h3>

            {state === "sent" ? (
              <div className="mt-5 grid min-h-[430px] flex-1 place-items-center rounded-[10px] border border-primary-green/30 bg-primary-green/10 p-6 text-center">
                <div>
                  <p className="tt-heading-md text-xl font-extrabold text-primary-green md:text-2xl">
                    ✓ თქვენი განცხადება მიღებულია!
                  </p>
                  <p className="tt-detail mt-3 text-base font-semibold text-primary-green/90">
                    ჩვენი სპეციალისტი 2 საათის განმავლობაში დაგიკავშირდებათ.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 flex flex-1 flex-col">
                <div className="grid gap-3">
                  <div className="grid gap-3 md:grid-cols-2">
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
                    className="gd-select w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-[15px] font-semibold text-white outline-none transition focus:border-primary-green focus:bg-primary-green/5"
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
                </div>

                <div className="mt-3 flex-1">
                  <textarea
                    name="message"
                    rows={5}
                    placeholder={t("fields.message")}
                    className="h-full min-h-[140px] w-full resize-none rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/35 transition focus:border-primary-green focus:bg-primary-green/5 md:min-h-[180px]"
                  />
                </div>

                <div className="mt-auto pt-4">
                  {error ? (
                    <p className="mb-3 text-sm text-red-400" aria-live="polite">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="btn-primary tt-ui w-full rounded-[10px] px-6 py-4 text-base font-semibold text-white shadow-glow-green disabled:opacity-60"
                  >
                    {state === "loading" ? "იგზავნება..." : submitLabel}
                  </button>
                </div>
              </form>
            )}
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
    <div className="flex gap-3.5 py-3.5">
      <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] border border-primary-green/30 bg-primary-green/15 text-white/85">
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
  return <Phone size={20} weight="duotone" aria-hidden="true" />;
}

function MailIcon() {
  return <EnvelopeSimple size={20} weight="duotone" aria-hidden="true" />;
}

function PinIcon() {
  return <MapPin size={20} weight="duotone" aria-hidden="true" />;
}

function ClockIcon() {
  return <Clock size={20} weight="duotone" aria-hidden="true" />;
}

function WhatsAppIcon() {
  return <BrandWhatsAppIcon className="h-4 w-4" />;
}

function FacebookIcon() {
  return <FacebookLogo size={16} weight="fill" aria-hidden="true" />;
}

function LinkedInIcon() {
  return <LinkedinLogo size={16} weight="fill" aria-hidden="true" />;
}

