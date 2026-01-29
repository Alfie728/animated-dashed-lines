"use client";

import { motion } from "motion/react";
import { useId } from "react";

interface AnimatedDashedLineProps {
  d: string;
  /** Stroke color for the base dashed line */
  strokeColor: string;
  /** Stroke color for the glow overlay segment */
  glowColor: string;
  /** Dash pattern, e.g. "3 3" */
  dashArray?: string;
  /** Glow segment visible length vs gap, e.g. "15 1000" */
  glowDashArray?: string;
  strokeWidth?: number;
  /** Total approximate path length for glow animation range */
  pathLength?: number;
  /** Duration in seconds for the base dash crawl animation */
  dashDuration?: number;
  /** Duration in seconds for the glow to traverse the path */
  glowDuration?: number;
  /** Delay before glow animation starts */
  glowDelay?: number;
}

export function AnimatedDashedLine({
  d,
  strokeColor,
  glowColor,
  dashArray = "3 3",
  glowDashArray = "15 1000",
  strokeWidth = 0.5,
  pathLength = 500,
  dashDuration = 1.5,
  glowDuration = 5,
  glowDelay = 0,
}: AnimatedDashedLineProps) {
  const maskId = useId();

  // dash crawl distance = sum of dash + gap so the pattern loops seamlessly
  const dashCrawlDistance = dashArray
    .split(" ")
    .reduce((sum, v) => sum + Number(v), 0);

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
        animate={{ strokeDashoffset: [0, -dashCrawlDistance] }}
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
        animate={{ strokeDashoffset: [0, -dashCrawlDistance] }}
        transition={{
          duration: dashDuration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <motion.path
            d={d}
            fill="none"
            stroke="#fff"
            strokeWidth={strokeWidth}
            strokeDasharray={glowDashArray}
            animate={{
              strokeDashoffset: [pathLength, -pathLength],
            }}
            transition={{
              duration: glowDuration,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              delay: glowDelay,
            }}
          />
        </mask>
      </defs>
    </>
  );
}
