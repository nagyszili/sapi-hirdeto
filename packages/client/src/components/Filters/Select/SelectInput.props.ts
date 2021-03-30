export interface SelectInputProps {
  elements: Element[];
  selectedElement?: any;
  setSelectedElement: (element: any) => void;
  placeholder?: string;
  label?: string;
  isSearchable?: boolean;
}

export interface Element {
  value: any;
  label: string;
}
