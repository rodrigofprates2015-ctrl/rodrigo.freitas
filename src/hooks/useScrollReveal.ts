import { useRef, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

interface UseScrollRevealOptions {
  type?: "fadeUp" | "fadeInScale" | "slideLeft" | "slideRight" | "fadeInRotate" | "staggerChildren";
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    type = "fadeUp",
    delay = 0,
    duration = 0.6,
    staggerDelay = 0.1,
  } = options;

  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
    },
    fadeInScale: {
      initial: { opacity: 0, scale: 0.85 },
      whileInView: { opacity: 1, scale: 1 },
    },
    slideLeft: {
      initial: { opacity: 0, x: -60 },
      whileInView: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: 60 },
      whileInView: { opacity: 1, x: 0 },
    },
    fadeInRotate: {
      initial: { opacity: 0, rotate: -10, y: 40 },
      whileInView: { opacity: 1, rotate: 0, y: 0 },
    },
    staggerChildren: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      variants: {
        container: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        },
        item: {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: duration,
            },
          },
        },
      },
    },
  };

  return {
    ...variants[type],
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
    viewport: { once: true, margin: "-100px" },
  };
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-100px" },
  variants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  },
});

export const fadeInUpVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const slideInLeftVariant = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const slideInRightVariant = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const scaleInVariant = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const rotateInVariant = {
  hidden: {
    opacity: 0,
    rotate: -15,
    y: 40,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    y: 0,
  },
};
