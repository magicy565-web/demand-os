import { useState, useEffect, useCallback } from "react"

/**
 * 检测是否为移动设备
 * @param breakpoint 断点宽度，默认 768px
 */
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [breakpoint])

  return isMobile
}

/**
 * 媒体查询 Hook
 * @param query 媒体查询字符串
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [query])

  return matches
}

/**
 * 窗口尺寸 Hook
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}

/**
 * 断点检测 Hook
 * 返回当前激活的断点
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<"sm" | "md" | "lg" | "xl" | "2xl">("sm")

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth
      if (width >= 1536) setBreakpoint("2xl")
      else if (width >= 1280) setBreakpoint("xl")
      else if (width >= 1024) setBreakpoint("lg")
      else if (width >= 768) setBreakpoint("md")
      else setBreakpoint("sm")
    }

    checkBreakpoint()
    window.addEventListener("resize", checkBreakpoint)
    return () => window.removeEventListener("resize", checkBreakpoint)
  }, [])

  return breakpoint
}

/**
 * 滚动位置 Hook
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollPosition
}

/**
 * 检测是否滚动到底部
 * @param threshold 距离底部的阈值
 */
export function useScrolledToBottom(threshold: number = 100) {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      setIsAtBottom(scrollTop + windowHeight >= documentHeight - threshold)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return isAtBottom
}

/**
 * 防抖 Hook
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

/**
 * 本地存储 Hook
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // 静默处理错误
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}
