import { useRef, useCallback, useEffect } from 'react';

interface Props {
  hasMore: boolean;
  loading: boolean;
  callback: () => void;
}

type ResultOfInfiniteScrollHook = (node: Element | null) => void;

export default function useInfiniteScroll({
  hasMore,
  loading,
  callback,
}: Props): ResultOfInfiniteScrollHook {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const callbackRef = useCallback(
    (node) => {
      if (loading) return;
      const observerCallback = (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      };
      if (!observer.current) observer.current = new IntersectionObserver(observerCallback);
      if (node) observer.current.observe(node);
    },
    [hasMore, loading, callback]
  );

  return callbackRef;
}
