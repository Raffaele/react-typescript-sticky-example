import { useRef, useEffect, useCallback } from 'react';

export function useThrottledCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): T {
  const timeoutRef = useRef<number | null>(null);
  const latestCallback = useRef(callback);

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const throttledCallback = useCallback<T>(function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    if (timeoutRef.current) {
      return;
    }
    latestCallback.current.apply(this, args);

    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      latestCallback.current.apply(this, args);
    }, delay);
  } as T, [delay]);

  return throttledCallback;
}