import { useState } from 'react';
import { CardPackType } from '../../core/components/packet';

export function usePacket(
  id: number,
  name: CardPackType,
  balance: number,
  cardCount: number
) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count + 1 > balance) return;
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
    cardCount,
    balance,
    count,
    handleIncrement,
    handleDecrement,
    reset,
  };
}
