import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} - ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#faf6ed", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 100 100">
            <polyline points="14,28 32,72 50,44 68,72 80,43" fill="none" stroke="#4b2440" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="86" cy="28" r="7" fill="#1D9E75" />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 700, color: "#4b2440" }}>Watchfront</span>
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
