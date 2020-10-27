import { useState, useCallback } from 'react';

type UseInputResult = [
  value: string | number,
  handler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  setValue: (value: string | number) => void
];

const useInput = (initialValue: string | number = ''): UseInputResult => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
};

export default useInput;
