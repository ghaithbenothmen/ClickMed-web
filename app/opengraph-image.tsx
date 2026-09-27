import { ImageResponse } from "next/og";
import { site } from "@/data/content";

export const alt = `${site.name} — ${site.tagline}`;
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
          background: "#0D3D3D",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 96,
            border: "2px solid rgba(200,224,74,0.35)",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -140,
            width: 520,
            height: 520,
            borderRadius: 96,
            border: "2px solid rgba(255,255,255,0.08)",
            transform: "rotate(45deg)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ position: "relative", width: 56, height: 56, display: "flex" }}>
            <div
              style={{
                position: "absolute",
                left: 6,
                top: 12,
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "#1A9E9E",
                opacity: 0.85,
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 18,
                top: 12,
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "#C8E04A",
                opacity: 0.85,
                transform: "rotate(-12deg)",
              }}
            />
          </div>
          <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>SHIFA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>{site.tagline}</span>
          <span style={{ fontSize: 28, color: "rgba(255,255,255,0.7)", maxWidth: 900, lineHeight: 1.35 }}>
            Une IA qui aide le médecin à réfléchir, sans jamais décider à sa place.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
