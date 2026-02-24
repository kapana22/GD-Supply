"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CaretDown,
  Check,
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
const WA_BUTTON_STYLE = {
  background:
    "linear-gradient(180deg, rgba(32,147,99,0.95) 0%, rgba(23,109,72,0.95) 100%)",
};

export function ContactSection() {
  const t = useTranslations("contact");
  const tCalc = useTranslations("calculator");

  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const serviceOptions = useMemo(
    () => filterContactServiceOptions(tCalc.raw("service_options") as string[]),
    [tCalc],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!selectedService) {
      setError("აირჩიე სერვისის სახეობა");
      setState("error");
      return;
    }

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      service: selectedService,
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
        setSelectedService("");
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
    <section id="contact" className="bg-gd-surface py-[60px] md:py-[88px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid items-stretch gap-7 lg:grid-cols-[470px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[500px_minmax(0,1fr)] xl:gap-10">
          <div className="flex h-full flex-col rounded-[22px] border border-white/12 bg-primary-navy/95 p-7 shadow-[0_18px_44px_rgba(0,0,0,0.26)] md:p-8">
            <h2 className="tt-heading-lg text-3xl font-extrabold text-white md:text-4xl">
              {t("title")}
            </h2>
            <p className="tt-detail mt-3 text-base leading-relaxed text-white/70">
              {t("subtitle")}
            </p>

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
              <div className="flex gap-4 py-5">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] border border-primary-green/30 bg-primary-green/15 text-white/85">
                  <ClockIcon />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-primary-green">
                    სამუშაო საათები
                  </span>
                  <div className="mt-1 space-y-0.5 text-sm font-semibold text-white/90">
                    {hours.map((h) => (
                      <div key={h} className="text-white/86">
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
                    className="tt-ui flex items-center justify-between gap-3 rounded-xl border border-primary-green/70 px-3.5 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(23,109,72,0.18)] transition hover:-translate-y-0.5 hover:border-primary-green hover:shadow-[0_10px_24px_rgba(23,109,72,0.22)]"
                    style={WA_BUTTON_STYLE}
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
                    className="tt-ui flex items-center justify-between gap-3 rounded-xl border border-primary-green/70 px-3.5 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(23,109,72,0.18)] transition hover:-translate-y-0.5 hover:border-primary-green hover:shadow-[0_10px_24px_rgba(23,109,72,0.22)]"
                    style={WA_BUTTON_STYLE}
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
                    target="_blank"
                    rel="noreferrer"
                    className="tt-ui inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/92 transition hover:border-primary-green/50 hover:bg-primary-green/10 hover:text-white"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                      <FacebookIcon />
                    </span>
                    Facebook
                  </a>
                  <a
                    href="https://linkedin.com/company/gd-supply"
                    target="_blank"
                    rel="noreferrer"
                    className="tt-ui inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/92 transition hover:border-primary-green/50 hover:bg-primary-green/10 hover:text-white"
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

          <div className="flex h-full flex-col rounded-[22px] border border-primary-green/20 bg-gd-result p-7 shadow-[0_18px_44px_rgba(0,0,0,0.26)] md:p-8">
            <h3 className="tt-heading-md text-xl font-extrabold text-white md:text-2xl">
              გამოგვიგზავნე განცხადება
            </h3>

            {state === "sent" ? (
              <div className="mt-5 grid min-h-[340px] flex-1 place-items-center rounded-xl border border-primary-green/25 bg-primary-green/10 p-6 text-center md:min-h-[430px]">
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
                <div className="grid gap-3.5">
                  <div className="grid gap-3.5 md:grid-cols-2">
                    <input
                      name="name"
                      required
                      placeholder={t("fields.name")}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/45 transition focus:border-primary-green/80 focus:bg-primary-green/5"
                    />
                    <input
                      name="phone"
                      required
                      placeholder={t("fields.phone")}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/45 transition focus:border-primary-green/80 focus:bg-primary-green/5"
                    />
                  </div>

                  <input
                    name="email"
                    type="email"
                    placeholder={t("fields.email")}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/45 transition focus:border-primary-green/80 focus:bg-primary-green/5"
                  />

                  <ServiceDropdown
                    name="service"
                    value={selectedService}
                    options={serviceOptions}
                    placeholder={t("fields.service")}
                    onChange={(value) => {
                      setSelectedService(value);
                      if (error) setError("");
                    }}
                  />

                  <input
                    name="area"
                    placeholder={t("fields.area")}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/45 transition focus:border-primary-green/80 focus:bg-primary-green/5"
                  />
                </div>

                <div className="mt-3.5 flex-1">
                  <textarea
                    name="message"
                    rows={5}
                    placeholder={t("fields.message")}
                    className="h-full min-h-[150px] w-full resize-none rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/45 transition focus:border-primary-green/80 focus:bg-primary-green/5 md:min-h-[190px]"
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
                    className="btn-primary tt-ui w-full rounded-xl px-6 py-4 text-base font-semibold text-white shadow-glow-green disabled:opacity-60"
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

function filterContactServiceOptions(options: string[]) {
  return options.filter((opt) => !/აუზ|pool|басс/i.test(opt));
}

function ServiceDropdown({
  name,
  options,
  value,
  onChange,
  placeholder,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocumentClick);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full rounded-xl border px-4 py-3 text-left text-[15px] font-semibold outline-none transition ${
          open
            ? "border-primary-green/80 bg-primary-green/5 text-white shadow-[0_0_0_2px_rgba(23,109,72,0.14)]"
            : value
              ? "border-white/12 bg-white/[0.045] text-white hover:border-white/20"
              : "border-white/10 bg-white/[0.045] text-white/55 hover:border-white/20 hover:text-white/85"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="block truncate pr-8">{value || placeholder}</span>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/70">
          <CaretDown
            size={16}
            weight="bold"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-xl border border-white/12 bg-[#11162d]/95 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur">
          <div className="max-h-56 overflow-y-auto pr-1">
            {options.map((opt) => {
              const active = opt === value;

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  role="option"
                  aria-selected={active}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
                    active
                      ? "bg-primary-green/14 text-white"
                      : "text-white/85 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {active ? (
                    <span className="flex-none text-primary-green">
                      <Check size={16} weight="bold" aria-hidden="true" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
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
    <div className="flex gap-3.5 py-4">
      <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] border border-primary-green/30 bg-primary-green/15 text-white/85">
        {icon}
      </div>
      <div className="min-w-0">
        <span className="block text-[11px] font-extrabold uppercase tracking-[0.08em] text-primary-green">
          {label}
        </span>
        <span className="mt-1 block text-sm font-semibold text-white/95">{value}</span>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block transition hover:brightness-110 hover:bg-white/[0.02]">
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

