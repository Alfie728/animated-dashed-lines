"use client";

import { motion } from "motion/react";
import { useId, useMemo } from "react";

function getPathLength(d: string): number {
  if (typeof document === "undefined") return 0;
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  return path.getTotalLength();
}

interface AnimatedDashedLineProps {
  d: string;
  /** Stroke color for the base dashed line */
  strokeColor: string;
  /** Stroke color for the glow overlay segment */
  glowColor: string;
  /** Dash and gap size in SVG units (default: 3) */
  dashSize?: number;
  /** Glow segment size in SVG units (default: 20) */
  glowSize?: number;
  strokeWidth?: number;
  /** Base dash crawl speed in SVG units per second (default: 20) */
  dashSpeed?: number;
  /** Glow travel speed in SVG units per second (default: 80) */
  glowSpeed?: number;
  /** Initial delay before the first glow animation */
  glowDelay?: number;
  /** Pause between each glow repeat cycle */
  glowRepeatDelay?: number;
  /** Direction of the dash crawl and glow travel ("forward" = start→end, "reverse" = end→start) */
  direction?: "forward" | "reverse";
}

export function AnimatedDashedLine({
  d,
  strokeColor,
  glowColor,
  dashSize = 3,
  glowSize = 20,
  strokeWidth = 0.5,
  dashSpeed = 20,
  glowSpeed = 80,
  glowDelay = 0,
  glowRepeatDelay,
  direction = "forward",
}: AnimatedDashedLineProps) {
  const maskId = useId();
  const reverse = direction === "reverse";
  const pathLength = useMemo(() => getPathLength(d), [d]);

  const dashArray = `${dashSize} ${dashSize}`;
  const dashCrawlDistance = dashSize * 2;
  const glowDashArray = `${glowSize} ${pathLength + glowSize}`;

  // Derive durations from speed and distance
  const dashDuration = dashCrawlDistance / dashSpeed;
  const glowDuration = (pathLength + glowSize) / glowSpeed;

  return (
    <>
      {/* Base dashed path */}
      <motion.path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeDasharray={dashArray}
        animate={{
          strokeDashoffset: reverse
            ? [0, dashCrawlDistance]
            : [0, -dashCrawlDistance],
        }}
        transition={{
          duration: dashDuration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {/* Glow overlay with mask */}
      <motion.path
        mask={`url(#${maskId})`}
        d={d}
        fill="none"
        stroke={glowColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dashArray}
        animate={{
          strokeDashoffset: reverse
            ? [0, dashCrawlDistance]
            : [0, -dashCrawlDistance],
        }}
        transition={{
          duration: dashDuration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {pathLength > 0 && (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <motion.path
              d={d}
              fill="none"
              stroke="#fff"
              strokeWidth={strokeWidth + 1}
              strokeDasharray={glowDashArray}
              animate={{
                strokeDashoffset: reverse
                  ? [-(pathLength + glowSize), glowSize]
                  : [glowSize, -(pathLength + glowSize)],
              }}
              transition={{
                duration: glowDuration,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                delay: glowDelay,
                repeatDelay: glowRepeatDelay,
              }}
            />
          </mask>
        </defs>
      )}
    </>
  );
}
