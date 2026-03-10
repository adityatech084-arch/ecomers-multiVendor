import { useRef, useEffect, useMemo } from "react";

/**
 * Custom debounce hook
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {Function & { cancel: Function }} Debounced function with cancel
 */
function useDebounce(fn, delay = 300) {
  const timer = useRef(null);
  // console.log("called")

  const debounced = useMemo(() => {
    const f = (...args) => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        fn(...args);
      }, delay);
    };

    f.cancel = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
    };

    return f;
  }, [fn, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return debounced;
}

export default useDebounce;
