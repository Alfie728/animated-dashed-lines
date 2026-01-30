"use client";

import { AnimatedDashedLine } from "./animated-dashed-line";

type LineVariant = "primary" | "muted";

interface LineConfig {
  d: string;
  variant: LineVariant;
  dashDuration?: number;
  glowSize?: number;
  glowDuration: number;
  glowDelay: number;
  glowRepeatDelay?: number;
  direction?: "forward" | "reverse";
}

const VARIANT_COLORS: Record<LineVariant, { stroke: string; glow: string }> = {
  primary: {
    stroke: "var(--line-primary)",
    glow: "var(--line-primary-glow)",
  },
  muted: {
    stroke: "var(--line-muted)",
    glow: "var(--line-muted-glow)",
  },
};

const lines: LineConfig[] = [
  {
    d: "M0 13.5H78.9175C81.9931 13.5 84.9943 14.4454 87.5145 16.2081L96.928 22.7919C99.4483 24.5546 102.449 25.5 105.525 25.5H126",
    variant: "primary",
    glowSize: 15,
    dashDuration: 0.3,
    glowDuration: 2,
    glowDelay: 0.5,
  },
  {
    d: "M0 21.5H78.9175C81.9931 21.5 84.9943 22.4454 87.5145 24.2081L96.928 30.7919C99.4483 32.5546 102.45 33.5 105.525 33.5H126H237.87C239.934 33.5 241.977 33.0738 243.869 32.2481L265.631 22.7519C267.523 21.9262 269.566 21.5 271.63 21.5H399.5",
    variant: "muted",
    dashDuration: 0.3,
    glowDuration: 7,
    glowDelay: 2,
    direction: "reverse",
  },
  {
    d: "M103 40H126.5",
    variant: "muted",
    dashDuration: 0.3,
    glowSize: 120,
    glowDuration: 0.5,
    glowDelay: 3,
    glowRepeatDelay: 7,
  },
  {
    d: "M0 65.5H48.3468C50.53 65.5 52.6868 65.0235 54.6667 64.1037L70.1808 56.8963C72.1607 55.9765 74.3175 55.5 76.5006 55.5H127H281.467C284.109 55.5 286.704 56.1978 288.99 57.5229L316.51 73.4771C318.796 74.8022 321.391 75.5 324.033 75.5H400",
    variant: "muted",
    dashDuration: 0.3,
    glowDuration: 6,
    glowDelay: 0,
    direction: "reverse",
  },
  {
    d: "M0 72.5H48.3468C50.53 72.5 52.6868 72.0235 54.6667 71.1037L70.1808 63.8963C72.1607 62.9765 74.3175 62.5 76.5006 62.5H127H281.915C284.59 62.5 287.216 63.215 289.521 64.571L316.479 80.429C318.784 81.785 321.41 82.5 324.085 82.5H400",
    variant: "primary",
    dashDuration: 0.3,
    glowDuration: 5,
    glowDelay: 1,
  },
  {
    d: "M0 79.5H48.3468C50.53 79.5 52.6868 79.0235 54.6667 78.1037L70.1808 70.8963C72.1607 69.9765 74.3175 69.5 76.5006 69.5H127H224",
    variant: "muted",
    dashDuration: 0.3,
    glowSize: 10,
    glowDuration: 2,
    glowDelay: 2,
    direction: "reverse",
  },
];

export function DashedLinesScene() {
  return (
    <div
      aria-hidden="true"
      className="relative isolate flex h-full w-full items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      <svg viewBox="0 0 400 94" fill="none" xmlns="http://www.w3.org/2000/svg">
        {lines.map((line, i) => {
          const colors = VARIANT_COLORS[line.variant];
          return (
            <AnimatedDashedLine
              key={i}
              d={line.d}
              strokeColor={colors.stroke}
              glowColor={colors.glow}
              dashDuration={line.dashDuration}
              glowSize={line.glowSize}
              glowDuration={line.glowDuration}
              glowDelay={line.glowDelay}
              glowRepeatDelay={line.glowRepeatDelay}
              direction={line.direction}
            />
          );
        })}

        {/* Small green indicator square - left side near line 6 */}
        <rect
          x="99"
          y="38"
          width="4"
          height="4"
          rx="0.5"
          className="fill-[var(--indicator-bg)]"
        />
        <rect
          x="100"
          y="39"
          width="2"
          height="2"
          rx="0.3"
          className="fill-[var(--indicator-dot)]"
        />

        {/* Small green indicator square - right side near bottom line */}
        <rect
          x="224"
          y="67.5"
          width="4"
          height="4"
          rx="0.5"
          className="fill-[var(--indicator-bg)]"
        />
        <rect
          x="225"
          y="68.5"
          width="2"
          height="2"
          rx="0.3"
          className="fill-[var(--indicator-dot)]"
        />

        {/* Vercel logo card */}
        <foreignObject
          x="247"
          y="43"
          width="30"
          height="30"
          className="overflow-visible"
        >
          <div className="h-full w-full rounded-sm border-[0.5px] border-[var(--card-border)] bg-[var(--card-bg)] shadow-xs dark:shadow-[0px_0px_3px_5px_rgba(0,0,0,0.5)]" />
        </foreignObject>
        <foreignObject
          x="255"
          y="52.096"
          width="14"
          height="11.808"
          className="overflow-visible"
        >
          <div className="flex h-full w-full items-center justify-center">
            <svg
              width="14"
              height="10"
              viewBox="0 0 32 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-[var(--foreground)]"
                d="M19.816 0C19.8861 3.73096e-06 19.9524 0.0294009 20 0.0796091L31.9347 12.8164H31.9334C32.081 12.9731 31.9672 13.2266 31.7493 13.2266H23.3063L31.9261 21.5824C32.0838 21.7367 31.9724 22 31.7496 22H12.1845C12.1144 22 12.048 21.9707 12.0005 21.9204L0.0666477 9.1837C-0.0810674 9.02695 0.0328473 8.77341 0.250661 8.77341L8.63153 8.78993L0.0738873 0.417614C-0.0838372 0.263307 0.0275573 6.79318e-06 0.251624 0H19.816ZM15.4196 8.81771L8.63153 8.78993L16.5798 16.489V13.1824L23.3063 13.2266L15.4196 5.51107V8.81771Z"
              />
            </svg>
          </div>
        </foreignObject>

        {/* GitHub logo card - main large card */}
        <foreignObject
          x="127"
          y="9"
          width="76"
          height="76"
          className="overflow-visible"
        >
          <div className="h-full w-full rounded-sm bg-[var(--card-bg)] bg-[repeating-linear-gradient(-45deg,var(--card-stripe)_0,var(--card-stripe)_0.5px,var(--card-bg)_0,var(--card-bg)_50%)] bg-[length:4px_4px] bg-repeat shadow-xs dark:shadow-[0px_0px_3px_5px_rgba(0,0,0,0.5)]" />
        </foreignObject>
        <rect
          x="134.85"
          y="16.85"
          width="60.3"
          height="60.3"
          rx="4.15"
          className="fill-[var(--card-bg)] stroke-[var(--card-border)]"
          strokeWidth="0.3"
        />
        <g clipPath="url(#clip-github)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M164.949 30C155.577 30 148 37.7917 148 47.431C148 55.1363 152.855 61.6586 159.589 63.9671C160.432 64.1406 160.74 63.592 160.74 63.1305C160.74 62.7264 160.712 61.3413 160.712 59.898C155.997 60.9372 155.015 57.8201 155.015 57.8201C154.258 55.8 153.135 55.2808 153.135 55.2808C151.592 54.213 153.247 54.213 153.247 54.213C154.959 54.3284 155.857 56.0022 155.857 56.0022C157.373 58.657 159.814 57.9069 160.796 57.4451C160.936 56.3195 161.386 55.5404 161.863 55.1076C158.102 54.7035 154.146 53.2029 154.146 46.5074C154.146 44.6026 154.819 43.0443 155.885 41.8324C155.717 41.3996 155.128 39.61 156.054 37.2147C156.054 37.2147 157.485 36.7529 160.712 39.004C162.093 38.6224 163.518 38.4283 164.949 38.4267C166.38 38.4267 167.839 38.6289 169.187 39.004C172.414 36.7529 173.845 37.2147 173.845 37.2147C174.771 39.61 174.181 41.3996 174.013 41.8324C175.108 43.0443 175.753 44.6026 175.753 46.5074C175.753 53.2029 171.797 54.6744 168.008 55.1076C168.626 55.6558 169.158 56.6946 169.158 58.3397C169.158 60.6772 169.131 62.5532 169.131 63.1302C169.131 63.592 169.439 64.1406 170.281 63.9674C177.016 61.6582 181.871 55.1363 181.871 47.431C181.898 37.7917 174.294 30 164.949 30Z"
            className="fill-[var(--icon-fill)]"
          />
        </g>
        <defs>
          <clipPath id="clip-github">
            <rect
              width="34"
              height="34"
              fill="white"
              transform="translate(148 30)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
