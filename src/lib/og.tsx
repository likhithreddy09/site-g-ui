import { ImageResponse } from "next/og";
import { SITE } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, s.lastIndexOf(" ", n - 1)).replace(/[,;:\s]+$/, "")}…` : s);

export function ogCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const size = title.length > 60 ? 54 : title.length > 40 ? 64 : 74;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#faf6ed", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="56" height="56" viewBox="0 0 100 100">
              <polyline points="14,28 32,72 50,44 68,72 80,43" fill="none" stroke="#4b2440" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="86" cy="28" r="7" fill="#1D9E75" />
            </svg>
            <span style={{ fontSize: 38, fontWeight: 700, color: "#4b2440" }}>{SITE.name}</span>
          </div>
          <span style={{ fontSize: 24, color: "#9b1b67", border: "2px solid #9b1b67", padding: "8px 20px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 2 }}>{eyebrow}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: size, fontWeight: 700, color: "#1c0f18", lineHeight: 1.08 }}>{clip(title, 90)}</div>
          {subtitle && <div style={{ marginTop: 26, fontSize: 30, color: "#5e3a54", lineHeight: 1.35 }}>{clip(subtitle, 130)}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#5e3a54" }}>
          <span>{SITE.url.replace(/^https?:\/\//, "")}</span>
          <span style={{ background: "#4b2440", color: "#faf6ed", padding: "10px 24px", borderRadius: 999 }}>Free 3-day trial</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
