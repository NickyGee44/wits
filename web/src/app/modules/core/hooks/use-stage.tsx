import { useContractRead } from 'wagmi';
import { PACKETS_ABI } from '../constants/abi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { useContract } from './use-contract';

const stageAtom = atom(0);

export function useStage() {
  const [stage, setStage] = useAtom(stageAtom);
  const contract = useContract();

  const fetchStage = useCallback(() => {
    contract.activeIndex().then((data: bigint) => {
      setStage(Number(data));
    });
  }, [contract]);

  return {
    stage,
    fetchStage,
  };
}
