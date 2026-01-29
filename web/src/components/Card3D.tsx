"use client";

import { useRef, useState, useCallback, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  disableInteractive?: boolean;
}

export function Card3D({
  children,
  className = "",
  glowColor = "rgba(0, 245, 255, 0.4)",
  intensity = 15,
  disableInteractive = true,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 鼠标位置
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 添加弹性效果
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  // 光效位置
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = () => {
    if (!disableInteractive) setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!disableInteractive) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={disableInteractive ? undefined : handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={disableInteractive ? {
          transformStyle: "preserve-3d",
        } : {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* 动态光效层 */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none z-10"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, ${glowColor}, transparent 50%)`
            ),
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* 边框光效 */}
        <motion.div
          className="absolute -inset-[1px] rounded-xl opacity-0 z-0"
          style={{
            background: `linear-gradient(45deg, #00f5ff, #9d4edd, #ff006e, #00f5ff)`,
            backgroundSize: "400% 400%",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          }}
          transition={{
            opacity: { duration: 0.3 },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* 内容层 */}
        <div className="relative z-5 bg-cyber-dark/95 rounded-xl overflow-hidden backdrop-blur-sm">
          {/* 扫描线效果 */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
            style={{ opacity: isHovered ? 0.3 : 0 }}
          >
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
              animate={{
                top: isHovered ? ["0%", "100%"] : "0%",
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {children}
        </div>

        {/* 底部反射 */}
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-8 rounded-b-xl blur-xl -z-10"
          style={{
            background: glowColor,
            opacity: isHovered ? 0.3 : 0.1,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
