import { useRef, useEffect } from 'react';

type Callback = () => void;
type Dependencies = unknown[];

export default function useDidMountEffect(func: Callback, deps: Dependencies): void {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
}
