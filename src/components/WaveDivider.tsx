type Props = {
  fill?: string; // css color for the wave
  bg?: string; // background color behind (transparent by default)
  flip?: boolean;
  className?: string;
};

export default function WaveDivider({
  fill = "var(--deep)",
  bg = "transparent",
  flip = false,
  className = "",
}: Props) {
  return (
    <div
      className={`w-full leading-[0] ${className}`}
      style={{ background: bg, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[70px] w-full sm:h-[110px]"
      >
        <path
          d="M0,64 C240,112 480,16 720,48 C960,80 1200,120 1440,72 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
