import { ImageResponse } from "next/og";

export const alt = "Maitreya Events — We create. You celebrate.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 80% 20%, #3a2410 0%, #0b0a08 60%)",
          color: "#f3ede3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, border: "4px solid #f4a340", display: "flex" }} />
          <div style={{ fontSize: 30, letterSpacing: 6, fontWeight: 700 }}>MAITREYA EVENTS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 800, letterSpacing: -6, lineHeight: 0.95 }}>
          <span>We create.</span>
          <span style={{ color: "#f4a340", fontStyle: "italic" }}>You celebrate.</span>
        </div>
        <div style={{ fontSize: 26, color: "#9d968a", letterSpacing: 4 }}>EVENTS • ENTERTAINMENT • EXPERIENCES — CHENNAI</div>
      </div>
    ),
    size,
  );
}
