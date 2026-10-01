import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/content";
import { brand } from "@/data/media";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", brand.logoLight.src));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const logoHeight = 64;
  const logoWidth = Math.round((brand.logoLight.width / brand.logoLight.height) * logoHeight);

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
        {/* Brand motif: the symbol's open C and stethoscope ring */}
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -170,
            width: 600,
            height: 600,
            borderRadius: 9999,
            border: "2px solid rgba(255,255,255,0.10)",
            borderRightColor: "transparent",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 90,
            top: 360,
            width: 56,
            height: 56,
            borderRadius: 9999,
            border: "2px solid rgba(200,224,74,0.45)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={logoSrc} width={logoWidth} height={logoHeight} alt="ClickMed" />
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
