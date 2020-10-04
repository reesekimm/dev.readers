import { useRef, useEffect } from 'react';

export default function useDidMountEffect(func, deps): void {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
}

// https://stackoverflow.com/a/57941438
