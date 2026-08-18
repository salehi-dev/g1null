import React, { useEffect, useRef, type ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

const SCROLL_RESPONSE_MS = 80;

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    let currentY = window.scrollY;
    let targetY = currentY;
    let previousTime = 0;
    let frameId = 0;
    let isEnabled = false;

    const render = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16.67;
      previousTime = time;

      const interpolation = 1 - Math.exp(-elapsed / SCROLL_RESPONSE_MS);
      currentY += (targetY - currentY) * interpolation;

      const lag = targetY - currentY;
      if (Math.abs(lag) < 0.1) {
        currentY = targetY;
        content.style.transform = 'translate3d(0, 0, 0)';
        frameId = 0;
        previousTime = 0;
        return;
      }

      content.style.transform = `translate3d(0, ${lag.toFixed(3)}px, 0)`;
      frameId = window.requestAnimationFrame(render);
    };

    const handleScroll = () => {
      targetY = window.scrollY;
      if (!frameId) frameId = window.requestAnimationFrame(render);
    };

    const enable = () => {
      if (isEnabled) return;
      isEnabled = true;
      currentY = window.scrollY;
      targetY = currentY;
      content.style.transform = 'translate3d(0, 0, 0)';
      content.style.willChange = 'transform';
      document.documentElement.classList.add('smooth-scroll-active');
      window.addEventListener('scroll', handleScroll, { passive: true });
    };

    const disable = () => {
      if (!isEnabled) return;
      isEnabled = false;
      window.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
      currentY = window.scrollY;
      targetY = currentY;
      content.style.transform = '';
      content.style.willChange = '';
      document.documentElement.classList.remove('smooth-scroll-active');
    };

    const syncScrollMode = () => {
      const isTouchDevice = coarsePointer.matches || navigator.maxTouchPoints > 0;
      if (reducedMotion.matches || isTouchDevice) disable();
      else enable();
    };

    reducedMotion.addEventListener('change', syncScrollMode);
    coarsePointer.addEventListener('change', syncScrollMode);
    syncScrollMode();

    return () => {
      reducedMotion.removeEventListener('change', syncScrollMode);
      coarsePointer.removeEventListener('change', syncScrollMode);
      disable();
    };
  }, []);

  return (
    <div ref={contentRef} className="smooth-scroll-content">
      {children}
    </div>
  );
}
