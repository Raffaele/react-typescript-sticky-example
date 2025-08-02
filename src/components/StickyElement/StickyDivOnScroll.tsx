import React, {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  useCallback,
} from "react";

import styles from "./StickyDivOnScroll.module.css";
import { useThrottledCallback } from "../../hooks/useThrottledCallback";

type StickyDivOnScrollProps = {
  children: ReactNode;
  stickyCheckDelay?: number;
};

const StickyDivOnScroll: React.FC<StickyDivOnScrollProps> = ({
  children,
  stickyCheckDelay = 0,
}) => {
  const [isSticky, setSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);

  const handleScroll = useCallback(() => {
    if (!stickyRef.current) return;
    if (placeholderRef.current) {
      if (placeholderRef.current.getBoundingClientRect().top >= 0)
        setSticky(false);
      return;
    }
    setSticky(stickyRef.current.getBoundingClientRect().top <= 0);
  }, [stickyRef, placeholderRef, setSticky, isSticky]);

  const optimizedScroll = useThrottledCallback(handleScroll, stickyCheckDelay);

  useEffect(() => {
    const abortController = new AbortController();
    if (stickyRef.current) {
      setPlaceholderHeight(stickyRef.current.offsetHeight);
    }

    window.addEventListener("scroll", optimizedScroll, abortController);

    return () => abortController.abort();
  }, [setPlaceholderHeight, stickyRef, placeholderRef, setSticky, isSticky]);

  return (
    <>
      {isSticky && (
        <div
          style={{ height: placeholderHeight, visibility: "hidden" }}
          ref={placeholderRef}
        ></div>
      )}

      <div ref={stickyRef} className={isSticky ? styles.stickyDiv : ""}>
        {children}
      </div>
    </>
  );
};

export default StickyDivOnScroll;
