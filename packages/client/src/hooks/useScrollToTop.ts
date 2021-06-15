import { useRef } from 'react';
import { ScrollView } from 'react-native';

export const useScrollToTop = () => {
  const scrollRef = useRef<ScrollView>(null);

  const scrollToTop = (animated?: boolean) =>
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: animated || false });

  return { scrollRef, scrollToTop };
};
