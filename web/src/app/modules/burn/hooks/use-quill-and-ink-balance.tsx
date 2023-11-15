import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

const balanceAtom = atom<number>(0);

export function useQuillAndInkBalance(_balance: number, ids: number[]) {
  const [balance, setBalance] = useAtom(balanceAtom);
  const INCREMENT = 2;

  const clearBalance = () => {
    setBalance(0);
  };

  const handleIncrement = () => {
    if (balance + INCREMENT > _balance) return;
    setBalance(balance + INCREMENT);
  };

  const handleDecrement = () => {
    if (balance - INCREMENT < 0) return;
    setBalance(balance - INCREMENT);
  };

  const quillAndInkBurnReturnValue = useMemo(
    () => Math.floor(balance / 2),
    [balance]
  );

  return {
    balance,
    toBurn: ids.slice(0, balance),
    setBalance,
    quillAndInkBurnReturnValue,
    handleIncrement,
    handleDecrement,
    clearBalance,
  };
}
