import { useState } from 'react';

export const useEditor = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    clear: () => setValue('')
  };
};
