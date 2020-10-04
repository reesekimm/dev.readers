import { useRef, useCallback } from 'react';

interface Props {
  hasMore: boolean;
  loading: boolean;
  page: number;
  callback: () => void;
}

type ResultOfInfiniteScrollHook = (node: HTMLDivElement | null) => void;

export default function useInfiniteScroll({
  hasMore,
  loading,
  page,
  callback,
}: Props): ResultOfInfiniteScrollHook {
  const observer = useRef<IntersectionObserver | null>(null);

  const callbackRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        const isIntersecting = entries[0].isIntersecting;
        const endOfList = entries[0].target.dataset.page === page.toString();
        if (isIntersecting && endOfList && hasMore) callback();
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading, page, callback]
  );

  return callbackRef;
}
