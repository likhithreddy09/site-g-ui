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
          borderRadius: 40,
        }}
      >
        <svg width="112" height="112" viewBox="0 0 32 32">
          <path d="M16 5.2a10.8 10.8 0 0 1 10.8 10.8" fill="none" stroke="#faf6ed" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M16 8.6a7.4 7.4 0 0 1 7.4 7.4" fill="none" stroke="#faf6ed" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M16 12a4 4 0 0 1 4 4" fill="none" stroke="#faf6ed" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M20.6 23.4a10.8 10.8 0 0 1-8.4 2.3" fill="none" stroke="#faf6ed" strokeWidth="2.1" strokeLinecap="round" opacity="0.5" />
          <circle cx="16" cy="5.2" r="1.7" fill="#f3c4de" />
          <circle cx="26.8" cy="16" r="1.7" fill="#f3c4de" />
          <circle cx="22.6" cy="24.3" r="1.7" fill="#f3c4de" />
          <circle cx="16" cy="16" r="2.6" fill="#faf6ed" />
        </svg>
      </div>
    ),
    size,
  );
}
