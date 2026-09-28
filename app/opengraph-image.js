import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Farsha Azizi — Back End & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          borderLeft: "24px solid #D42121",
        }}
      >
        <img src={logoSrc} width={120} height={120} style={{ borderRadius: 24 }} alt="" />
        <div style={{ marginTop: 48, fontSize: 80, fontWeight: 800, color: "#0F172A" }}>
          Farsha Azizi
        </div>
        <div style={{ marginTop: 12, fontSize: 44, fontWeight: 700, color: "#D42121" }}>
          Back End & Full Stack Developer
        </div>
        <div style={{ marginTop: 24, fontSize: 30, color: "#475569" }}>
          7+ Years · Laravel · Node.js · Express.js · Next.js
        </div>
      </div>
    ),
    { ...size }
  );
}
