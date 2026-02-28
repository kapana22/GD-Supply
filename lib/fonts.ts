import localFont from "next/font/local";
import { Noto_Sans_Georgian } from "next/font/google";

export const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  display: "swap",
  variable: "--font-noto-georgian",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const contractica = localFont({
  src: [
    {
      path: "../public/fonts/tbc-contractica/TBCContractica-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/tbc-contractica/TBCContractica-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/tbc-contractica/TBCContractica-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/tbc-contractica/TBCContractica-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-contractica",
  display: "swap",
});

export const contracticaCaps = localFont({
  src: [
    {
      path: "../public/fonts/tbc-contractica/TBCContracticaCAPS-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/tbc-contractica/TBCContracticaCAPS-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/tbc-contractica/TBCContracticaCAPS-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/tbc-contractica/TBCContracticaCAPS-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-contractica-caps",
  display: "swap",
});
