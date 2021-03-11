import { useState, useImperativeHandle } from 'react';

export const useTextInput = (
  ref?: any,
  errorMessage?: (value: string) => string | undefined,
) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);

  const onChangeText = (text: string) => {
    setValue(text);
    setError('');
  };

  useImperativeHandle(ref, () => ({
    getValue() {
      const error = errorMessage && errorMessage(value);
      setError(error);
      return error ? false : value;
    },
    showError(error?: string) {
      error && setError(error);
      return error ? error : value;
    },
  }));

  return { value, error, onChangeText };
};
