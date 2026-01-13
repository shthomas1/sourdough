import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

/**
 * Hook for scroll-triggered animations using Intersection Observer
 * Returns a ref to attach to the element and a boolean indicating if it's visible
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // If reduced motion is preferred, show immediately without animation
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true)
              if (triggerOnce) {
                setHasAnimated(true)
              }
            }, delay)
          } else {
            setIsVisible(true)
            if (triggerOnce) {
              setHasAnimated(true)
            }
          }
        } else if (!triggerOnce && !hasAnimated) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated])

  return { ref: elementRef, isVisible }
}

/**
 * Hook for animating numbers (counter effect)
 */
export const useCounterAnimation = (
  targetValue: string,
  isVisible: boolean,
  duration: number = 2000
) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    if (!isVisible) {
      setCount(0)
      countRef.current = 0
      return
    }

    // Extract numeric value from string (e.g., "10+" -> 10, "500+" -> 500)
    const numericValue = parseInt(targetValue.replace(/\D/g, '')) || 0

    if (numericValue === 0) {
      setCount(0)
      return
    }

    const startTime = Date.now()
    const startValue = 0
    const endValue = numericValue

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut)

      countRef.current = currentValue
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [targetValue, isVisible, duration])

  // Format the count with the original suffix
  const suffix = targetValue.replace(/\d/g, '')
  return `${count}${suffix}`
}
