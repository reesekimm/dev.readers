import { useEffect, useRef } from 'react';

export default function useClickOutside(onClose: () => void) {
  const ref = useRef(null);

  useEffect(() => {
    const innerElement = ref.current;
    if (!innerElement) return;

    function clickListener(e: MouseEvent) {
      if (e.target.closest('#click-outside-disabled')) return;
      if (innerElement && !innerElement.contains(e.target)) {
        onClose?.();
      }
    }
    document.addEventListener('click', clickListener);
    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, [ref, onClose]);

  return ref;
}
