import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#faf6ed", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <path d="M16 2.5 4.5 7v8.2c0 7 4.9 12.6 11.5 14.3 6.6-1.7 11.5-7.3 11.5-14.3V7L16 2.5Z" fill="#4b2440" />
            <path d="M9.5 16.5h3.2l2-4.5 3 8 2-3.5h2.8" fill="none" stroke="#8fd3f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 700, color: "#4b2440" }}>siteguard</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: "#1c0f18", lineHeight: 1.05 }}>Know when client sites break</div>
          <div style={{ fontSize: 76, fontWeight: 700, color: "#9b1b67", lineHeight: 1.05 }}>and why they broke.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#5e3a54" }}>Uptime · SSL · Forms · Visual checks · APIs · JS errors · Client reports</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#5e3a54" }}>
          <span>{SITE.tagline}</span>
          <span style={{ background: "#4b2440", color: "#faf6ed", padding: "10px 24px", borderRadius: 999 }}>Start free</span>
        </div>
      </div>
    ),
    size,
  );
}
