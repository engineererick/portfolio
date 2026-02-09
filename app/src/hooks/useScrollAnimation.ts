"use client";

import { useEffect, useRef } from "react";

interface UseScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    animationClass?: string;
    once?: boolean;
}

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver
 *
 * @param options Configuration options
 * @returns Ref to attach to the element you want to animate
 *
 * @example
 * ```tsx
 * const ref = useScrollAnimation({ threshold: 0.2 });
 * return <div ref={ref} className="opacity-0">Content</div>
 * ```
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    options: UseScrollAnimationOptions = {}
) {
    const {
        threshold = 0.1,
        rootMargin = "0px",
        animationClass = "animate-fade-up",
        once = true,
    } = options;

    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(animationClass);

                        if (once) {
                            observer.unobserve(entry.target);
                        }
                    } else if (!once) {
                        entry.target.classList.remove(animationClass);
                    }
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, animationClass, once]);

    return elementRef;
}

/**
 * Hook for animating multiple child elements with staggered delays
 *
 * @param selector CSS selector for child elements to animate
 * @param options Configuration options
 * @returns Ref to attach to the parent container
 *
 * @example
 * ```tsx
 * const ref = useScrollAnimationChildren('.skill-card');
 * return <div ref={ref}>{cards}</div>
 * ```
 */
export function useScrollAnimationChildren<T extends HTMLElement = HTMLDivElement>(
    selector: string,
    options: UseScrollAnimationOptions = {}
) {
    const {
        threshold = 0.1,
        rootMargin = "0px",
        animationClass = "animate-fade-up",
        once = true,
    } = options;

    const containerRef = useRef<T>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = container.querySelectorAll(selector);
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(animationClass);

                        if (once) {
                            observer.unobserve(entry.target);
                        }
                    } else if (!once) {
                        entry.target.classList.remove(animationClass);
                    }
                });
            },
            { threshold, rootMargin }
        );

        elements.forEach((element) => observer.observe(element));

        return () => {
            observer.disconnect();
        };
    }, [selector, threshold, rootMargin, animationClass, once]);

    return containerRef;
}
