import { useState, useRef, useCallback, useEffect } from 'react';

type IntersectionObserverHookRefCallback = (node: HTMLDivElement | null) => void;

type UseInfiniteScrollHookResult = [
  callbackRef: IntersectionObserverHookRefCallback,
  entry: IntersectionObserverEntry | undefined,
  isVisible: boolean
];

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

export default function useInfiniteScroll(): UseInfiniteScrollHookResult {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    return () => {
      const observer = observerRef.current;
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const callbackRef = useCallback((node) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        setEntry(entry);
      }, options);
    }
    if (node) observerRef.current.observe(node);
  }, []);

  const isVisible = Boolean(entry && entry.isIntersecting);

  return [callbackRef, entry, isVisible];
}
