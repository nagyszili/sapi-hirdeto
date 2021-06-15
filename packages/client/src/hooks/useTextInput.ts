import { useState, useImperativeHandle, useEffect } from 'react';

export const useTextInput = (
  ref?: any,
  errorMessage?: (value: string) => string | undefined,
  initialValue?: string | null | undefined
) => {
  const [value, setValue] = useState<string>(initialValue || '');
  const [error, setError] = useState<string | undefined>(undefined);

  const onChangeText = (text: string) => {
    setValue(text);
    setError('');
  };

  useEffect(() => {
    initialValue && setValue(initialValue);
  }, [initialValue]);

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
    clearValue() {
      setValue('');
    },
  }));

  return { value, error, onChangeText };
};
