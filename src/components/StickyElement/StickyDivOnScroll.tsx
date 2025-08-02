import React, { useState, useEffect, useRef, type ReactNode } from "react";

import styles from "./StickyDivOnScroll.module.css";

type StickyDivOnScrollProps = {
  children: ReactNode;
};

const StickyDivOnScroll: React.FC<StickyDivOnScrollProps> = ({ children }) => {
  const [isSticky, setSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    if (stickyRef.current) {
      setPlaceholderHeight(stickyRef.current.offsetHeight);
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!stickyRef.current) return;
        if (placeholderRef.current) {
          if (placeholderRef.current.getBoundingClientRect().top >= 0)
            setSticky(false);
          return;
        }
        setSticky(stickyRef.current.getBoundingClientRect().top <= 0);
      },
      abortController
    );

    return () => abortController.abort();
  }, [setPlaceholderHeight, stickyRef, placeholderRef, setSticky, isSticky]);

  return (
    <>
      {isSticky && (
        <div
          style={{ height: placeholderHeight, visibility: "hidden" }}
          ref={placeholderRef}
        >
          Pippo
        </div>
      )}

      <div ref={stickyRef} className={isSticky ? styles.stickyDiv : ""}>
        {children}
      </div>
    </>
  );
};

export default StickyDivOnScroll;
