import { useEffect, useState } from "react";

interface FeelLogoProps {
  variant?: "dark" | "light" | "auto";
  className?: string;
  style?: React.CSSProperties;
}

export default function FeelLogo({ variant = "dark", className, style }: FeelLogoProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (variant === "auto") {
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      setIsDark(document.documentElement.classList.contains("dark"));
      return () => observer.disconnect();
    }
  }, [variant]);

  const useDark = variant === "dark" || (variant === "auto" && isDark);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      className={className}
      style={style}
      aria-label="Feel Again logo"
      role="img"
    >
      {/* F — solid */}
      <path
        d="M 285.71 226.54 L 285.71 797.46 L 345.54 797.46 L 345.54 541.41 L 532.39 541.41 L 532.39 484.11 L 345.54 484.11 L 345.54 283.84 L 547.33 283.84 L 547.33 226.54 Z"
        fill={useDark ? "#FFFFFF" : "#0F2B46"}
      />
      {/* E — gold */}
      <path
        d="M 407.41 226.54 L 407.41 797.46 L 467.24 797.46 L 467.24 541.41 L 654.09 541.41 L 654.09 484.11 L 467.24 484.11 L 467.24 283.84 L 669.03 283.84 L 669.03 226.54 Z"
        fill="#D4A017"
      />
      {/* E — semi-transparent */}
      <path
        d="M 529.11 226.54 L 529.11 797.46 L 588.94 797.46 L 588.94 541.41 L 775.79 541.41 L 775.79 484.11 L 588.94 484.11 L 588.94 283.84 L 790.73 283.84 L 790.73 226.54 Z"
        fill={useDark ? "rgba(255,255,255,0.55)" : "rgba(15,43,70,0.55)"}
      />
      {/* L — transparent */}
      <path
        d="M 650.81 226.54 L 650.81 797.46 L 710.64 797.46 L 710.64 283.84 L 790.73 283.84 L 790.73 226.54 Z"
        fill={useDark ? "rgba(255,255,255,0.3)" : "rgba(15,43,70,0.3)"}
      />
      {/* Again text */}
      <text
        x="512"
        y="950"
        textAnchor="middle"
        fill="#D4A017"
        fontFamily="system-ui, sans-serif"
        fontSize="100"
        fontWeight="700"
        letterSpacing="8"
      >
        Again
      </text>
    </svg>
  );
}
