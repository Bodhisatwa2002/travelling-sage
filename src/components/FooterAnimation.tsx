export default function FooterAnimation() {
  return (
    <div className="bg-[#060610]">
      <div
        className="overflow-hidden relative mx-auto max-w-360 w-full"
        style={{ height: 160 }}
      >
        <p
          className="absolute text-center select-none font-[family-name:var(--font-press-start)]"
          style={{
            fontSize: 80,
            letterSpacing: 6,
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 0,
            width: 1625,
            height: 217,
            lineHeight: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          TRAVELING SAGE
        </p>
      </div>
    </div>
  );
}
