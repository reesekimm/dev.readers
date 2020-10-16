import { useRef, useCallback } from 'react';

interface Props {
  hasMore: boolean;
  loading: boolean;
  page?: number;
  lastId?: number | string;
  callback: () => void;
}

type ResultOfInfiniteScrollHook = (node: HTMLDivElement | null) => void;

export default function useInfiniteScroll({
  hasMore,
  loading,
  page,
  lastId,
  callback,
}: Props): ResultOfInfiniteScrollHook {
  const observer = useRef<IntersectionObserver | null>(null);

  const callbackRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        const isIntersecting = entries[0].isIntersecting;
        let endOfList;
        if (page) {
          endOfList = entries[0].target.dataset.page === page.toString();
        } else if (lastId) {
          endOfList = entries[0].target.dataset.reviewid === lastId.toString();
        } else {
          console.info('page 또는 lastId 인자를 입력해 주세요.');
        }
        if (isIntersecting && endOfList && hasMore) callback();
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading, page, lastId, callback]
  );

  return callbackRef;
}
