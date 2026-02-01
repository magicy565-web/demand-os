/**
 * 共享动画变体模块
 * 用于 Framer Motion 动画配置
 * 
 * 所有变体对象均兼容 framer-motion Variants 类型
 */

// 基础淡入动画
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
} as const;

// 淡入上移动画
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
} as const;

// 淡入下移动画
export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
} as const;

// 淡入左移动画
export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  },
} as const;

// 淡入右移动画
export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  },
} as const;

// 缩放动画
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  },
} as const;

// 弹性缩放动画
export const scaleInBounce = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  },
} as const;

// 容器交错动画（用于列表）
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

// 快速交错容器
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
} as const;

// 列表项动画
export const listItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  },
} as const;

// 卡片悬浮动画
export const cardHover = {
  initial: { y: 0 },
  hover: { 
    y: -8,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
} as const;

// 按钮点击动画
export const buttonTap = {
  initial: { scale: 1 },
  tap: { scale: 0.95 },
} as const;

// 页面过渡动画
export const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.3 }
  },
} as const;

// 滑入动画（从底部）
export const slideInBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  },
} as const;

// 脉冲动画（用于强调元素）
export const pulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
} as const;

// 旋转动画
export const spin = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
} as const;

// 打字机效果容器
export const typewriterContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
} as const;

// 打字机效果字符
export const typewriterChar = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.1 }
  },
} as const;

// 视口内触发配置
export const viewportConfig = {
  once: true,
  margin: "-100px",
} as const;

// 动画延迟工具函数
export const delayedTransition = (delay: number) => ({
  transition: { delay },
});

// 创建自定义交错动画
export const createStaggerVariants = (
  staggerDelay: number = 0.1,
  initialDelay: number = 0
) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

// 创建自定义淡入动画
export const createFadeInVariants = (
  direction: "up" | "down" | "left" | "right" = "up",
  distance: number = 30,
  duration: number = 0.6
) => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return {
    hidden: { opacity: 0, ...directionMap[direction] },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { duration }
    },
  };
};
