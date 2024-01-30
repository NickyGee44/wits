import { useContractRead } from 'wagmi';
import { PACKETS_ABI } from '../constants/abi';
import { BigNumber, Contract, constants } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useContract } from './use-contract';

export function useTotalSupply(address: `0x${string}`, id: number) {
  const [totalSupply, setTotalSupply] = useState(0);
  const contract = useContract();

  const fetchTotalSupply = useCallback(async () => {
    const capacity = (await contract?.capacity(id)) ?? BigNumber.from(0);
    const totalSupply = (await contract?.totalSupply(id)) ?? BigNumber.from(0);

    console.log(
      'capacity',
      capacity.toNumber(),
      'totalSupply',
      totalSupply.toNumber()
    );

    setTotalSupply(capacity.sub(totalSupply).toNumber() ?? 0);
  }, [contract, id]);

  return {
    totalSupply,
    fetchTotalSupply,
  };
}
