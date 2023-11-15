import { useState } from 'react';

export function usePacket(
  id: number,
  name: string,
  supply: number,
  price: bigint,
  dollar: string,
  cent: string,
  cardCount: number
) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count + 1 > supply) return;
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count - 1 < 0) return;
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return {
    id,
    name,
    price,
    supply,
    count,
    cardCount,
    dollar,
    cent,
    handleIncrement,
    handleDecrement,
    reset,
  };
}
