import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4b2440",
          borderRadius: 36,
        }}
      >
        <svg width="110" height="110" viewBox="0 0 32 32">
          <path d="M16 5.5a10.5 10.5 0 0 1 10.5 10.5" fill="none" stroke="#faf6ed" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M16 8.75a7.25 7.25 0 0 1 7.25 7.25" fill="none" stroke="#faf6ed" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M16 12a4 4 0 0 1 4 4" fill="none" stroke="#faf6ed" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M20.5 23.2a10.5 10.5 0 0 1-8.2 2.3" fill="none" stroke="#faf6ed" strokeWidth="1.75" strokeLinecap="round" opacity="0.55" />
          <circle cx="16" cy="5.5" r="1.55" fill="#f8e8f1" />
          <circle cx="26.5" cy="16" r="1.55" fill="#f8e8f1" />
          <circle cx="22.4" cy="24.1" r="1.55" fill="#f8e8f1" />
          <circle cx="16" cy="16" r="2.35" fill="#faf6ed" />
        </svg>
      </div>
    ),
    size,
  );
}
