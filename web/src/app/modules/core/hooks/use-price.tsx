import { PACKETS_ABI } from '../constants/abi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BigNumber, Contract } from 'ethers';

import { useContract } from './use-contract';

export function usePrice(address: `0x${string}`, stage: number) {
  const [price, setPrice] = useState(BigNumber.from(0));
  const contract = useContract();

  const fetchPrice = useCallback(() => {
    contract.price(stage).then((data: BigNumber) => {
      setPrice(data);
    });
  }, [contract, stage]);

  return {
    price,
    fetchPrice,
  };
}
