import { useEffect, useState, useCallback } from "react";

export default function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  type windowProps = {
    width: number | undefined;
    height: number | undefined;
  };
  const [windowSize, setWindowSize] = useState<windowProps>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window

    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount

  return { windowSize, setWindowSize };
}
