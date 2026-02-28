"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

const values = [
  {
    title: "სანდოობა",
    body: "ვმუშაობთ შეთანხმებული ვადებით და პასუხისმგებლობით. თითოეული პროექტი სრულდება წინასწარ გაწერილი სტანდარტით.",
    icon: <ShieldIcon />,
  },
  {
    title: "ხარისხი",
    body: "ვიყენებთ მხოლოდ სერტიფიცირებულ მასალებს და გამოცდილი ბრიგადებით ვასრულებთ მონტაჟს ყველა ტექნოლოგიური წესის დაცვით.",
    icon: <MedalIcon />,
  },
  {
    title: "გამჭვირვალობა",
    body: "კლიენტს ყველა ეტაპზე აქვს სრული ინფორმაცია: მასალები, ვადები, ბიუჯეტი და შესრულების პროგრესი.",
    icon: <EyeIcon />,
  },
  {
    title: "გარანტია",
    body: "სამუშაოს დასრულების შემდეგ გაძლევთ 6 წლიან გარანტიას. შედეგი არის გაზომვადი და კონტროლირებადი.",
    icon: <WarrantyIcon />,
  },
] as const;

const processSteps = [
  { title: "ინსპექცია", body: "ობიექტის ადგილზე შეფასება და პრობლემის დიაგნოზი." },
  { title: "შერჩევა", body: "სისტემისა და მასალების ოპტიმალური შერჩევა." },
  { title: "ხელშეკრულება", body: "ვადების, ბიუჯეტის და გარანტიის ფიქსაცია." },
  { title: "შესრულება", body: "სამუშაოს წარმოება ხარისხის სრული კონტროლით." },
  { title: "ჩაბარება", body: "ფინალური შემოწმება და ობიექტის ოფიციალური ჩაბარება." },
] as const;

const team = [
  {
    initials: "PM",
    role: "Project Manager",
    description: "მართავს ვადებს, რესურსებს და უზრუნველყოფს კლიენტთან ყოველდღიურ კომუნიკაციას.",
  },
  {
    initials: "LT",
    role: "Lead Technician",
    description: "ხელმძღვანელობს ტექნიკურ გუნდს და აკონტროლებს სისტემის სწორი მონტაჟის პროცესს.",
  },
  {
    initials: "QC",
    role: "QC Specialist",
    description: "ასრულებს ხარისხის შემოწმებას და ფინალურ ტესტირებას ჩაბარებამდე.",
  },
] as const;

const partners = ["Sika", "Mapei", "Soprema", "Isomat", "BASF", "Penetron", "Drizoro", "Ceresit"] as const;


const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function AboutPage({ locale }: { locale: string }) {
  return (
    <div className="relative">
      <motion.section {...fadeUp} className="border-b border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <p className="text-sm text-white/60">
            <Link href={`/${locale}`} className="hover:text-white">
              მთავარი
            </Link>{" "}
            <span className="mx-2 text-white/35">→</span>
            <span className="text-white/85">ჩვენ შესახებ</span>
          </p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">ჩვენ შესახებ</h1>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/65">
            სერვისი რომელიც გიცავთ სახურავისა და ტერასიდან წყლის გაჟონვისგან-უზრუნველყოფს თქვენს სიმშვიდეს მრავალი
            წლის მანძილზე. 2014 წლიდან ვაშენებთ სანდოობას და ვნერგავთ ჰიდროიზოლაციის სისტემებს, რომლებიც რეალურად
            მუშაობს ქართულ კლიმატსა და დატვირთვებზე.
          </p>
        </div>
      </motion.section>

      <motion.section id="about-story" {...fadeUp} className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1440px] items-start gap-6 px-5 md:px-10 xl:grid-cols-12 xl:gap-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/18 bg-[linear-gradient(180deg,rgba(11,16,31,0.88),rgba(11,16,31,0.72))] p-6 shadow-[0_24px_60px_rgba(3,6,16,0.4),inset_0_1px_0_rgba(255,255,255,0.08),0_0_38px_rgba(23,109,72,0.10)] backdrop-blur-xl md:p-8 lg:p-10 xl:col-span-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_200px_at_8%_0%,rgba(255,255,255,0.08),transparent_72%),radial-gradient(540px_220px_at_95%_6%,rgba(23,109,72,0.20),transparent_76%),linear-gradient(120deg,rgba(255,255,255,0.03)_0%,transparent_36%,transparent_64%,rgba(28,184,121,0.06)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)]" />
            <div className="pointer-events-none absolute inset-x-[12%] bottom-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(28,184,121,0.0),rgba(28,184,121,0.75),rgba(28,184,121,0.0),transparent)]" />

            <p className="relative text-xs font-extrabold uppercase tracking-[0.18em] text-[#1CB879]">კომპანიის ისტორია</p>
            <h2 className="relative mt-3 text-2xl font-black text-white md:text-3xl">მოკლედ ჩვენ შესახებ</h2>
            <p className="relative mt-4 text-base leading-relaxed text-white/82">
              GD Supply 2014 წლიდან მუშაობს ჰიდროიზოლაციაზე და ასრულებს პროექტებს კერძო, კომერციულ და ინდუსტრიულ ობიექტებზე.
              ჩვენი მიზანია მარტივი: სწორად შერჩეული სისტემა, ხარისხიანი შესრულება და გრძელვადიანი შედეგი.
            </p>

            <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/60">სპეციალიზაცია</p>
                <p className="mt-1 text-sm font-semibold text-white/90">სახურავი, ტერასა, საძირკველი</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/60">მუშაობის ფორმატი</p>
                <p className="mt-1 text-sm font-semibold text-white/90">ინსპექციიდან ჩაბარებამდე</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/60">ფოკუსი</p>
                <p className="mt-1 text-sm font-semibold text-white/90">გამძლე შედეგი და ხარისხი</p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-5">
            <div className="relative self-start overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(180deg,rgba(11,16,31,0.9),rgba(11,16,31,0.74))] shadow-[0_24px_60px_rgba(3,6,16,0.46),inset_0_1px_0_rgba(255,255,255,0.11),0_0_44px_rgba(23,109,72,0.12)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(620px_220px_at_5%_0%,rgba(255,255,255,0.08),transparent_72%),radial-gradient(520px_220px_at_96%_8%,rgba(23,109,72,0.22),transparent_74%),linear-gradient(120deg,rgba(255,255,255,0.03)_0%,transparent_40%,transparent_62%,rgba(23,109,72,0.06)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.10),rgba(28,184,121,0.35),rgba(255,255,255,0.10),transparent)]" />
              <div className="pointer-events-none absolute left-[18%] right-[18%] bottom-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(28,184,121,0.0),rgba(28,184,121,0.7),rgba(28,184,121,0.0),transparent)]" />

              <div className="relative px-5 pb-2 pt-4 md:px-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary-green">GD Supply</p>
                <p className="mt-1 text-sm text-white/68">ციფრებში: გამოცდილება, შესრულებული პროექტები და შედეგის სტანდარტი.</p>
              </div>

              <div className="relative grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2">
                <IntroStat value={6} suffix="+" label="გამოცდილება" duration={1500} className="border-b border-r border-white/12 md:border-b-0 xl:border-b xl:border-r" />
                <IntroStat value={300} suffix="+" label="პროექტი" duration={2000} className="border-b border-white/12 md:border-b-0 md:border-r md:border-white/12 xl:border-b xl:border-r-0 xl:border-white/12" />
                <IntroStat value={10} suffix="+" label="წლ. გარანტია" duration={900} className="border-r border-white/12 md:border-r xl:border-r" />
                <IntroStat value={100} suffix="%" label="კმაყოფილება" duration={1800} />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="about-values" {...fadeUp} className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1CB879]">ჩვენი ფასეულობები</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">რაც გვარჩევს ბაზარზე</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {values.map((item) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1.5"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-primary-green transition duration-300 group-hover:scale-x-100" />
                <div className="text-white/90">{item.icon}</div>
                <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="about-process" {...fadeUp} className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1CB879]">პროცესი</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">როგორ ვმუშაობთ</h2>

          <div className="relative mt-10 hidden md:block">
            <div className="absolute left-0 right-0 top-4 h-px bg-white/20" />
            <motion.div
              className="absolute left-0 top-4 h-px bg-primary-green"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1 }}
              style={{ width: "100%" }}
            />

            <div className="grid grid-cols-5 gap-6">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative pt-10">
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full border border-primary-green bg-[#1A1C33] text-center text-sm font-bold leading-8 text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 md:hidden">
            <div className="absolute left-4 top-0 h-full w-px bg-white/20" />
            <motion.div
              className="absolute left-4 top-0 w-px bg-primary-green"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1 }}
              style={{ height: "100%" }}
            />

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative pl-12">
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full border border-primary-green bg-[#1A1C33] text-center text-sm font-bold leading-8 text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="about-team" {...fadeUp} className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1CB879]">გუნდი</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">მთავარი როლები პროექტში</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {team.map((member) => (
              <motion.article
                key={member.role}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full border border-primary-green bg-primary-green/20 text-lg font-black text-white">
                  {member.initials}
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{member.role}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{member.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#1CB879]">ვიყენებთ მხოლოდ სერტიფიცირებულ მასალებს</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {partners.map((brand) => (
              <span key={brand} className="text-lg font-semibold text-white/35 grayscale transition hover:text-white hover:grayscale-0">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="rounded-3xl px-6 py-12 md:px-12" style={{ background: "linear-gradient(135deg, #176D48, #0f4d34)" }}>
            <h2 className="text-3xl font-black text-white md:text-5xl">მზად ხართ? ჩვენც.</h2>
            <p className="mt-4 max-w-2xl text-base text-white/85">
              მიიღეთ უფასო ინსპექცია და ზუსტი ტექნიკური გადაწყვეტა თქვენი ობიექტისთვის.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className="btn-primary inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold text-white"
              >
                უფასო კონსულტაცია
              </Link>
              <Link
                href={`/${locale}/services`}
                className="btn-secondary inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold text-white"
              >
                სერვისების ნახვა
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function IntroStat({
  value,
  suffix,
  label,
  duration,
  className = "",
}: {
  value: number;
  suffix: string;
  label: string;
  duration: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { count, trigger } = useCountUp(value, duration);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <div
      ref={ref}
      className={`group relative flex min-h-[104px] flex-col items-center justify-center bg-transparent px-4 py-5 text-center md:min-h-[118px] md:px-5 md:py-6 ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="flex items-baseline justify-center gap-0.5">
        <span className="font-sans text-[34px] font-black leading-none tracking-tight text-[var(--gd-accent-bright)] drop-shadow-[0_6px_20px_rgba(23,109,72,0.44)] tabular-nums md:text-[46px]">
          {count}
        </span>
        <span className="font-sans text-[22px] font-black leading-none tracking-tight text-[var(--gd-accent-bright)] drop-shadow-[0_4px_16px_rgba(23,109,72,0.34)] md:text-[28px]">
          {suffix}
        </span>
      </div>
      <p className="tt-label mt-1.5 text-white/88">{label}</p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3l7 3v6c0 4.5-2.8 7.7-7 9-4.2-1.3-7-4.5-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="9" r="4.5" />
      <path d="M9 14.8 7 21l5-2.2L17 21l-2-6.2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
      <path d="M16.5 5.5 19 3" />
    </svg>
  );
}
