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
        <svg width="132" height="132" viewBox="0 0 100 100">
          <polyline
            points="14,28 32,72 50,44 68,72 80,43"
            fill="none"
            stroke="#faf6ed"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="86" cy="28" r="7" fill="#1D9E75" />
        </svg>
      </div>
    ),
    size,
  );
}
