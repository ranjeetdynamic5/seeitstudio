import { motion } from 'framer-motion';
import React from 'react';

const strokeVariants = {
  idle: { pathLength: 1 },
  hovering: (custom: number) => ({
    pathLength: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
      delay: custom * 0.1,
    },
  }),
};

export const TracedPath = ({ custom = 0, isHovered, className = "", ...props }: any) => (
  <motion.path {...props} variants={strokeVariants} custom={custom} initial="idle" animate={isHovered ? "hovering" : "idle"} className={`stroke-current ${className}`} />
);

export const TracedCircle = ({ custom = 0, isHovered, className = "", ...props }: any) => (
  <motion.circle {...props} variants={strokeVariants} custom={custom} initial="idle" animate={isHovered ? "hovering" : "idle"} className={`stroke-current ${className}`} />
);

export const TracedRect = ({ custom = 0, isHovered, className = "", ...props }: any) => (
  <motion.rect {...props} variants={strokeVariants} custom={custom} initial="idle" animate={isHovered ? "hovering" : "idle"} className={`stroke-current ${className}`} />
);

export const TracedEllipse = ({ custom = 0, isHovered, className = "", ...props }: any) => (
  <motion.ellipse {...props} variants={strokeVariants} custom={custom} initial="idle" animate={isHovered ? "hovering" : "idle"} className={`stroke-current ${className}`} />
);

const sharedProps = { width: 300, height: 300, viewBox: "0 0 300 300", fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 2};

export const RenderingIcon = ({ isHovered }: { isHovered?: boolean }) => (
  <svg {...sharedProps}>
    <TracedPath isHovered={isHovered} d="M 150 50 L 236 100 L 236 200 L 150 250 L 64 200 L 64 100 Z" custom={0} />
    <TracedPath isHovered={isHovered} d="M 150 50 L 150 150 L 236 200" custom={1} />
    <TracedPath isHovered={isHovered} d="M 64 100 L 150 150 L 150 250" custom={2} />
    <TracedPath isHovered={isHovered} d="M 150 170 L 210 135" custom={3} />
    <TracedPath isHovered={isHovered} d="M 150 190 L 210 155" custom={4} />
    <TracedPath isHovered={isHovered} d="M 150 210 L 210 175" custom={5} />
    <TracedPath isHovered={isHovered} d="M 150 230 L 210 195" custom={6} />
  </svg>
);

export const ModellingIcon = ({ isHovered }: { isHovered?: boolean }) => (
  <svg {...sharedProps}>
    <TracedCircle isHovered={isHovered} cx="150" cy="150" r="110" custom={0} />
    <TracedEllipse isHovered={isHovered} cx="150" cy="150" rx="110" ry="40" custom={1} />
    <TracedEllipse isHovered={isHovered} cx="150" cy="150" rx="40" ry="110" custom={2} />
    <TracedPath isHovered={isHovered} d="M 150 20 L 150 280" custom={3} />
    <TracedPath isHovered={isHovered} d="M 20 150 L 280 150" custom={4} />
  </svg>
);

export const AiIcon = ({ isHovered }: { isHovered?: boolean }) => (
  <svg {...sharedProps}>
    <TracedCircle isHovered={isHovered} cx="150" cy="150" r="30" custom={0} />
    <TracedCircle isHovered={isHovered} cx="150" cy="45" r="16" custom={1} />
    <TracedCircle isHovered={isHovered} cx="255" cy="150" r="16" custom={2} />
    <TracedCircle isHovered={isHovered} cx="150" cy="255" r="16" custom={3} />
    <TracedCircle isHovered={isHovered} cx="45" cy="150" r="16" custom={4} />
    <TracedPath isHovered={isHovered} d="M 150 120 L 150 61" custom={5} />
    <TracedPath isHovered={isHovered} d="M 180 150 L 239 150" custom={6} />
    <TracedPath isHovered={isHovered} d="M 150 180 L 150 239" custom={7} />
    <TracedPath isHovered={isHovered} d="M 120 150 L 61 150" custom={8} />
    <TracedCircle isHovered={isHovered} cx="225" cy="75" r="10" custom={9} />
    <TracedCircle isHovered={isHovered} cx="225" cy="225" r="10" custom={10} />
    <TracedCircle isHovered={isHovered} cx="75" cy="225" r="10" custom={11} />
    <TracedCircle isHovered={isHovered} cx="75" cy="75" r="10" custom={12} />
    <TracedPath isHovered={isHovered} d="M 171 129 L 218 82" custom={13} />
    <TracedPath isHovered={isHovered} d="M 171 171 L 218 218" custom={14} />
    <TracedPath isHovered={isHovered} d="M 129 171 L 82 218" custom={15} />
    <TracedPath isHovered={isHovered} d="M 129 129 L 82 82" custom={16} />
  </svg>
);

export const WebIcon = ({ isHovered }: { isHovered?: boolean }) => (
  <svg {...sharedProps}>
    <TracedRect isHovered={isHovered} x="30" y="60" width="240" height="180" rx="16" custom={0} />
    <TracedPath isHovered={isHovered} d="M 30 110 L 270 110" custom={1} />
    <TracedCircle isHovered={isHovered} cx="60" cy="85" r="5" fill="currentColor" stroke="none" custom={2} />
    <TracedCircle isHovered={isHovered} cx="80" cy="85" r="5" fill="currentColor" stroke="none" custom={3} />
    <TracedCircle isHovered={isHovered} cx="100" cy="85" r="5" fill="currentColor" stroke="none" custom={4} />
    <TracedPath isHovered={isHovered} d="M 130 85 L 240 85" custom={5} />
    <TracedPath isHovered={isHovered} d="M 115 150 L 85 175 L 115 200" custom={6} />
    <TracedPath isHovered={isHovered} d="M 185 150 L 215 175 L 185 200" custom={7} />
    <TracedPath isHovered={isHovered} d="M 160 140 L 140 210" custom={8} />
  </svg>
);
