import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Traveling Sage — India Travel Stories, Guides & Itineraries";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, #1A1A1A 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: "8px",
              color: "#CCCCCC",
              textTransform: "uppercase",
            }}
          >
            Traveling
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "4px",
            }}
          >
            SAGE
          </div>
          <div
            style={{
              width: 80,
              height: 2,
              backgroundColor: "#FFFFFF",
              marginTop: 8,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              fontSize: 20,
              color: "#AAAAAA",
              maxWidth: 600,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            India Travel Stories, Guides & Itineraries
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
