import { useState, useEffect } from 'react';

interface Props {
  errorMessage?: (value: any) => string | undefined;
  initialValue?: any | null | undefined;
}

export const useSelectInput = ({ errorMessage, initialValue }: Props) => {
  const [selectedElement, setSelectedElement] = useState<any>(initialValue);
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = (value: any) => {
    setSelectedElement(value);
    setError('');
  };

  useEffect(() => {
    initialValue && setSelectedElement(initialValue);
  }, [initialValue]);

  const getValue = () => {
    const errorMsg = errorMessage && errorMessage(selectedElement);
    setError(errorMsg);
    return errorMsg ? false : selectedElement;
  };

  return {
    selectedElement,
    error,
    onChange,
    getValue,
  };
};
