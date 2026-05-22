'use client';

import React, { useState, useRef } from 'react';
import { motion, MotionConfigContext, LayoutGroup, type MotionStyle } from 'framer-motion';

interface Props {
  heading?: string;
  text?: string;
  variant?: 'Default' | 'Hover';
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

const transition1 = { bounce: 0, delay: 0, duration: 0.4, type: "spring" as const };
const transition2 = { delay: 0, duration: 0.4, ease: [0.44, 0, 0.56, 1] as [number, number, number, number], type: "tween" as const };
const transformTemplate1 = (_: any, t: string) => `translate(-50%, -50%) ${t}`;

const Transition: React.FC<{ value: any; children: React.ReactNode }> = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return <MotionConfigContext.Provider value={contextValue}>{children}</MotionConfigContext.Provider>;
};

const Variants = motion.create(React.Fragment);

export const IconHover3D: React.FC<Props> = ({
  heading = "Service",
  text = "Service description here.",
  variant = 'Default',
  className = "",
  style = {},
  width = 600,
  height = 150,
  ...restProps
}) => {
  const [currentVariant, setCurrentVariant] = useState<'Default' | 'Hover'>(variant);
  const [gestureState, setGestureState] = useState({ isHovered: false });
  const refBinding = useRef<HTMLDivElement>(null);
  const defaultLayoutId = React.useId();

  const isHoverVariant = currentVariant === 'Hover';
  const variants = [currentVariant === 'Default' ? 'GPnJri30y' : 'zEwHlJ7zp'];

  const handleMouseEnter = async () => { setGestureState({ isHovered: true }); setCurrentVariant('Hover'); };
  const handleMouseLeave = async () => { setGestureState({ isHovered: false }); setCurrentVariant('Default'); };

  const cubeSliceVariants = { zEwHlJ7zp: { "--border-color": "rgb(0, 102, 255)" } };
  const titleTransition = { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], type: "tween" as const };
  const sliceCubeVariants = { zEwHlJ7zp: { rotateX: -28, rotateY: -43, scale: 1.1 } };
  const cornerScaleVariants = { zEwHlJ7zp: { scale: 2.2 } };

  const sliceBaseStyle: MotionStyle = {
    alignContent: "center", alignItems: "center", display: "flex", flex: "none",
    flexDirection: "column", flexWrap: "nowrap", gap: "10px", height: "34px",
    justifyContent: "center", overflow: "hidden", padding: "0px", position: "relative",
    width: "240px", border: "4px solid var(--foreground)", backgroundColor: "var(--background)",
    zIndex: 120,
  };

  return (
    <div style={{ width, height }}>
      <LayoutGroup id={defaultLayoutId}>
        <Variants animate={variants} initial={false}>
          <Transition value={transition1}>
            <motion.div
              {...restProps}
              className={`icon-hover-3d ${className}`}
              ref={refBinding}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={currentVariant === 'Hover' ? handleMouseLeave : undefined}
              style={{
                backgroundColor: "var(--background)", alignContent: "center", alignItems: "center",
                display: "flex", flexDirection: "row", flexWrap: "nowrap", gap: "40px",
                height: "min-content", justifyContent: "center", overflow: "visible",
                padding: "20px", position: "relative", width: "min-content",
                borderRadius: "12px", border: "1px solid color-mix(in srgb, var(--foreground) 10%, transparent)",
                ...style
              }}
            >
              <motion.div style={{ alignContent: "center", alignItems: "center", display: "flex", flex: "none", flexDirection: "row", flexWrap: "nowrap", gap: "10px", height: "100px", justifyContent: "center", overflow: "visible", padding: "0px", position: "relative", width: "100px", border: "1px solid color-mix(in srgb, var(--foreground) 20%, transparent)" }}>
                <motion.div style={{ flex: "none", height: "348px", overflow: "visible", position: "relative", width: "348px", zIndex: 2, scale: 0.3 }}>
                  <motion.div
                    style={{ alignContent: "center", alignItems: "center", display: "flex", flex: "none", flexDirection: "column", flexWrap: "nowrap", gap: "28px", height: "min-content", justifyContent: "center", left: "50%", overflow: "visible", padding: "0px", position: "absolute", top: "50%", transformStyle: "preserve-3d", width: "min-content", transformPerspective: 1200 }}
                    transformTemplate={transformTemplate1}
                    initial={{ rotate: 49, rotateX: 23, rotateY: 33, scale: 0.7 }}
                    variants={sliceCubeVariants}
                    animate={isHoverVariant ? 'zEwHlJ7zp' : { rotate: 49, rotateX: 23, rotateY: 33, scale: 0.7 }}
                  >
                    {[1,2,3].map((n) => (
                      <Transition key={n} value={transition2}>
                        <motion.div style={{ alignContent: "center", alignItems: "center", display: "flex", flex: "none", flexDirection: "row", flexWrap: "nowrap", gap: "10px", height: "min-content", justifyContent: "center", overflow: "visible", padding: "0px", position: "relative", transformStyle: "preserve-3d", width: "min-content" }}>
                          <motion.div style={sliceBaseStyle} variants={cubeSliceVariants} animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'} />
                          <motion.div style={{ ...sliceBaseStyle, position: "absolute", right: "0px", top: "0px", bottom: "0px", zIndex: 1 }} initial={{ rotateY: 180 }} animate={{ rotateY: 180 }} />
                          <motion.div style={{ ...sliceBaseStyle, position: "absolute", left: "120px", top: "0px", bottom: "0px", zIndex: 1 }} initial={{ rotateY: 90 }} animate={{ rotateY: 90 }} />
                          <motion.div style={{ ...sliceBaseStyle, position: "absolute", right: "120px", top: "0px", bottom: "0px", zIndex: 1 }} initial={{ rotateY: -90 }} animate={{ rotateY: -90 }} />
                          <motion.div
                            style={{ flex: "none", height: "240px", left: "0px", overflow: "hidden", position: "absolute", right: "0px", top: "-120px", zIndex: 1, border: "4px solid var(--foreground)", backgroundColor: "var(--background)" }}
                            initial={{ rotateX: 90 }} animate={{ rotateX: 90 }}
                          />
                          <motion.div
                            style={{ flex: "none", height: "240px", left: "0px", overflow: "hidden", position: "absolute", right: "0px", top: "-86px", zIndex: 1, border: "4px solid var(--foreground)", backgroundColor: "var(--background)" }}
                            initial={{ rotateX: 90 }} animate={{ rotateX: 90 }}
                          />
                        </motion.div>
                      </Transition>
                    ))}
                  </motion.div>
                  {[
                    { top: isHoverVariant ? "-6px" : "14px", left: isHoverVariant ? "-6px" : "14px", borderLeft: "4px solid var(--foreground)", borderTop: "4px solid var(--foreground)" },
                    { top: isHoverVariant ? "330px" : "310px", left: isHoverVariant ? "-6px" : "14px", borderLeft: "4px solid var(--foreground)", borderBottom: "4px solid var(--foreground)" },
                    { bottom: isHoverVariant ? "-6px" : "14px", right: isHoverVariant ? "-6px" : "14px", borderRight: "4px solid var(--foreground)", borderBottom: "4px solid var(--foreground)" },
                    { top: isHoverVariant ? "-6px" : "14px", right: isHoverVariant ? "-6px" : "14px", borderRight: "4px solid var(--foreground)", borderTop: "4px solid var(--foreground)" },
                  ].map((s, i) => (
                    <motion.div key={i} style={{ flex: "none", height: "24px", overflow: "hidden", position: "absolute", width: "24px", zIndex: 2, ...s }} variants={cornerScaleVariants} animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'} />
                  ))}
                </motion.div>
              </motion.div>

              <motion.div style={{ alignContent: "flex-start", alignItems: "flex-start", display: "flex", flex: "none", flexDirection: "column", flexWrap: "nowrap", gap: "12px", height: "min-content", justifyContent: "center", maxWidth: "400px", overflow: "hidden", padding: "0px", position: "relative", width: "min-content" }}>
                <motion.div style={{ alignContent: "center", alignItems: "center", display: "flex", flex: "none", flexDirection: "row", flexWrap: "nowrap", gap: "10px", height: "32px", justifyContent: "center", overflow: "visible", padding: "0px", position: "relative" }}>
                  <motion.div style={{ flex: "none", height: "32px", position: "relative", whiteSpace: "pre", width: "auto", fontFamily: '"Inter", sans-serif', fontWeight: "600", fontSize: "18px", color: "var(--foreground)", userSelect: "none", cursor: "pointer", display: "flex", alignItems: "center", overflow: "hidden" }}>
                    <span style={{ position: "relative", zIndex: 1 }}>{heading}</span>
                    <motion.span style={{ position: "absolute", top: 0, left: 0, color: "var(--background)", clipPath: `inset(0 ${isHoverVariant ? '0%' : '100%'} 0 0)`, zIndex: 2 }} animate={{ clipPath: `inset(0 ${isHoverVariant ? '0%' : '100%'} 0 0)` }} transition={titleTransition}>{heading}</motion.span>
                    <motion.div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "var(--foreground)", transformOrigin: "left center", zIndex: 1 }} animate={{ scaleX: isHoverVariant ? 1 : 0 }} transition={titleTransition} />
                  </motion.div>
                </motion.div>
                <motion.div style={{ flex: "none", height: "auto", position: "relative", whiteSpace: "pre-wrap", width: "220px", wordBreak: "break-word", fontFamily: '"Inter", sans-serif', fontWeight: "400", fontSize: "14px", lineHeight: "1.5em", color: "color-mix(in srgb, var(--foreground) 70%, transparent)", userSelect: "none" }}>
                  {text}
                </motion.div>
              </motion.div>
            </motion.div>
          </Transition>
        </Variants>
      </LayoutGroup>
    </div>
  );
};