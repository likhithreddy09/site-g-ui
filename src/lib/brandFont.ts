import { Bricolage_Grotesque } from "next/font/google";

/** Distinctive wordmark face — applied via next/font className (not Tailwind). */
export const brandFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});
