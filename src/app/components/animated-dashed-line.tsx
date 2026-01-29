"use client";

import { motion } from "motion/react";
import { useId } from "react";

interface AnimatedDashedLineProps {
  d: string;
  /** Stroke color for the base dashed line */
  strokeColor: string;
  /** Stroke color for the glow overlay segment */
  glowColor: string;
  /** Dash and gap size in SVG units (default: 3) */
  dashSize?: number;
  /** Glow segment size as a percentage of path length */
  glowSize?: number;
  strokeWidth?: number;
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
  dashSize = 3,
  glowSize = 5,
  strokeWidth = 0.5,
  dashDuration = 1.5,
  glowDuration = 5,
  glowDelay = 0,
}: AnimatedDashedLineProps) {
  const maskId = useId();

  const dashArray = `${dashSize} ${dashSize}`;
  const dashCrawlDistance = dashSize * 2;
  const glowDashArray = `${glowSize} ${100}`;

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
          {/*
            Offset goes from glowSize (segment fully before the path
            start) to -100 (segment fully past the path end).
          */}
          <motion.path
            d={d}
            pathLength={100}
            fill="none"
            stroke="#fff"
            strokeWidth={strokeWidth + 1}
            strokeDasharray={glowDashArray}
            animate={{
              strokeDashoffset: [glowSize, -100],
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
