import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** PNG app icon (home screens) — also used as the logo in Google's business data */
export default function AppleIcon() {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0a08" }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          {petals.map((r) => (
            <ellipse key={r} cx="16" cy="9.5" rx="2.8" ry="5.6" fill="none" stroke="#f4a340" strokeWidth="1.6" transform={`rotate(${r} 16 16)`} />
          ))}
          <circle cx="16" cy="16" r="2.4" fill="#f4a340" />
        </svg>
      </div>
    ),
    size,
  );
}
