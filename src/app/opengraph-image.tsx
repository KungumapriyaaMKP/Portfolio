import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — AI/ML Engineer & Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const BRACKET = 40;
const ARM = 44;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#05070d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(560px 420px at 30% 42%, rgba(245,149,74,0.22), rgba(245,149,74,0) 70%)",
          }}
        />

        {[
          { top: BRACKET, left: BRACKET, borderTop: "3px solid #f5954a", borderLeft: "3px solid #f5954a" },
          { top: BRACKET, right: BRACKET, borderTop: "3px solid #f5954a", borderRight: "3px solid #f5954a" },
          { bottom: BRACKET, left: BRACKET, borderBottom: "3px solid #f5954a", borderLeft: "3px solid #f5954a" },
          { bottom: BRACKET, right: BRACKET, borderBottom: "3px solid #f5954a", borderRight: "3px solid #f5954a" },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: ARM,
              height: ARM,
              display: "flex",
              opacity: 0.85,
              ...pos,
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 20,
            letterSpacing: 6,
            color: "#f5954a",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: "#f5954a" }} />
          Portfolio
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 84,
            fontWeight: 800,
            color: "#fdf6ee",
            letterSpacing: -1,
          }}
        >
          Kungumapriyaa M
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 30,
            color: "#fdf6ee",
            opacity: 0.85,
          }}
        >
          AI/ML Engineer &nbsp;·&nbsp; Full-Stack Developer
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 20,
            fontFamily: "monospace",
            color: "#8a7d6d",
            letterSpacing: 1,
          }}
        >
          GRAPH NEURAL NETWORKS · COMPUTER VISION · AGENTIC AI
        </div>
      </div>
    ),
    { ...size }
  );
}
