import { useState } from 'react';

export const useProductList = () => {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(16);

  const goBack = (): void => {
    if (to <= 16) return;
    setTo(from);
    setFrom(from - 16);
  };

  const goRight = (productsLength: number): void => {
    if (to >= productsLength) return;
    setFrom(to);
    setTo(to + 16);
  };

  const getCurrentCount = (to: number, productsLength: number): number => {
    if (productsLength >= to) return to;

    return productsLength;
  };

  return {
    //Variables
    from,
    to,

    //Functions
    goBack,
    goRight,
    getCurrentCount,
  };
};
