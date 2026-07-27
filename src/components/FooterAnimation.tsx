export default function FooterAnimation() {
  return (
    <div className="bg-[#060610]">
      <div
        className="overflow-hidden relative mx-auto max-w-360 w-full h-[80px] sm:h-[120px] md:h-[160px]"
      >
        <p
          className="absolute text-center select-none font-[family-name:var(--font-press-start)] text-[32px] sm:text-[50px] md:text-[80px] tracking-[3px] sm:tracking-[4px] md:tracking-[6px]"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 0,
            width: "max-content",
            lineHeight: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,1) 70%)",
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
