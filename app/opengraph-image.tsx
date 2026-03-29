import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#491612",
        }}
      >
        {/* Gold accent bar */}
        <div
          style={{
            width: 64,
            height: 4,
            backgroundColor: "#A88849",
            borderRadius: 9999,
            marginBottom: 32,
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#A88849",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          Twakka Achar
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#F6F1E8",
            marginTop: 20,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Authentic Nepali Homemade Pickles
        </div>

        {/* Gold accent bar */}
        <div
          style={{
            width: 64,
            height: 4,
            backgroundColor: "#A88849",
            borderRadius: 9999,
            marginTop: 32,
          }}
        />
      </div>
    ),
    size
  );
}
