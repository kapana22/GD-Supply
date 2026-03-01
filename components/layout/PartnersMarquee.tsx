import Image from "next/image";
import { useTranslations } from "next-intl";

const PARTNER_LOGOS = [
  { src: "/assets/partners/adjara-group.png", alt: "Adjara Group" },
  { src: "/assets/partners/ambassadori_logo_gold.png", alt: "Ambassadori" },
  { src: "/assets/partners/brand-logo.png", alt: "Partner Brand" },
  { src: "/assets/partners/greenox-logo-01-1-1.png", alt: "Greenox" },
  { src: "/assets/partners/lukoil-logo-brandlogo.net_.png", alt: "Lukoil" },
  { src: "/assets/partners/logo.png", alt: "Partner Logo" },
  { src: "/assets/partners/logo (1).png", alt: "Partner Logo" },
  { src: "/assets/partners/logo_signature.png", alt: "Partner Signature" },
  { src: "/assets/partners/images.png", alt: "Partner Logo" },
  { src: "/assets/partners/images (1).png", alt: "Partner Logo" },
  { src: "/assets/partners/images (2).png", alt: "Partner Logo" },
  { src: "/assets/partners/images.jpg", alt: "Partner Logo" },
  { src: "/assets/partners/images (1).jpg", alt: "Partner Logo" },
  { src: "/assets/partners/images (2).jpg", alt: "Partner Logo" },
  { src: "/assets/partners/images (3).jpg", alt: "Partner Logo" },
];

const LOOP_LOGOS = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
const MARQUEE_DURATION_S = Math.max(36, PARTNER_LOGOS.length * 3.8);

export function PartnersMarquee() {
  const t = useTranslations("partners");

  return (
    <section className="gd-cv-auto gd-section-divider relative py-10 md:py-12">
      <div className="gd-container">
        <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
          {t("eyebrow")}
        </p>
        <h2 className="tt-heading-lg mt-2 font-extrabold text-white">
          {t("title")}
        </h2>

        <div className="partners-marquee-mask mt-6">
          <div
            className="partners-marquee-track"
            style={{ ["--partners-marquee-duration" as string]: `${MARQUEE_DURATION_S}s` }}
          >
            {LOOP_LOGOS.map((logo, index) => (
              <div key={`${logo.src}-${index}`} className="partners-logo-tile">
                <div className="partners-logo-frame">
                  <Image
                    src={logo.src}
                    alt={t("logo_alt", { name: logo.alt })}
                    fill
                    sizes="180px"
                    className="partners-logo-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
