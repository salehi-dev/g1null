import React, { useEffect, type ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

const SCROLL_RESPONSE_MS = 55;
// Browsers may quantize scroll positions to half pixels on high-DPI displays.
const STOP_DISTANCE_PX = 0.75;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const canNestedScrollerConsume = (target: EventTarget | null, deltaY: number) => {
  let element = target instanceof HTMLElement ? target : null;

  while (element && element !== document.body) {
    const { overflowY } = window.getComputedStyle(element);
    const isScrollable = /(auto|scroll|overlay)/.test(overflowY)
      && element.scrollHeight > element.clientHeight;

    if (isScrollable) {
      const canScrollUp = deltaY < 0 && element.scrollTop > 0;
      const canScrollDown = deltaY > 0
        && element.scrollTop + element.clientHeight < element.scrollHeight - 1;

      if (canScrollUp || canScrollDown) return true;
    }

    element = element.parentElement;
  }

  return false;
};

const normalizeWheelDelta = (event: WheelEvent) => {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16;
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    let targetY = window.scrollY;
    let previousTime = 0;
    let frameId = 0;
    let isEnabled = false;
    let lastDirection = 0;

    const maxScrollY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const stopAnimation = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
      targetY = window.scrollY;
      lastDirection = 0;
      document.documentElement.classList.remove('wheel-scroll-running');
    };

    const render = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16.67;
      previousTime = time;

      const interpolation = 1 - Math.exp(-elapsed / SCROLL_RESPONSE_MS);
      const currentY = window.scrollY;
      const distance = targetY - currentY;

      if (Math.abs(distance) <= STOP_DISTANCE_PX) {
        window.scrollTo(0, targetY);
        frameId = 0;
        previousTime = 0;
        lastDirection = 0;
        document.documentElement.classList.remove('wheel-scroll-running');
        return;
      }

      window.scrollTo(0, currentY + distance * interpolation);
      frameId = window.requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (frameId) return;
      document.documentElement.classList.add('wheel-scroll-running');
      frameId = window.requestAnimationFrame(render);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const deltaY = normalizeWheelDelta(event);
      if (!deltaY) return;

      if (canNestedScrollerConsume(event.target, deltaY)) {
        stopAnimation();
        return;
      }

      event.preventDefault();

      const direction = Math.sign(deltaY);
      const currentY = window.scrollY;

      if (lastDirection && direction !== lastDirection) {
        // A reversal starts from the visible position and discards opposing momentum.
        stopAnimation();
        targetY = currentY;
      }

      const maximumPendingDistance = Math.min(window.innerHeight * 0.65, 560);
      const nextTarget = targetY + deltaY;
      targetY = clamp(
        nextTarget,
        Math.max(0, currentY - maximumPendingDistance),
        Math.min(maxScrollY(), currentY + maximumPendingDistance),
      );
      lastDirection = direction;

      if (Math.abs(targetY - currentY) > STOP_DISTANCE_PX) startAnimation();
    };

    const enable = () => {
      if (isEnabled) return;
      isEnabled = true;
      targetY = window.scrollY;
      document.documentElement.classList.add('wheel-scroll-enabled');
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('pointerdown', stopAnimation, { passive: true });
      window.addEventListener('keydown', stopAnimation, { passive: true });
    };

    const disable = () => {
      if (!isEnabled) return;
      isEnabled = false;
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointerdown', stopAnimation);
      window.removeEventListener('keydown', stopAnimation);
      stopAnimation();
      document.documentElement.classList.remove('wheel-scroll-enabled');
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
    <div className="smooth-scroll-content">
      {children}
    </div>
  );
}
