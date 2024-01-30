import { Contract } from 'ethers';
import { useMemo } from 'react';
import { PACKETS_ABI } from '../constants/abi';
import {
  JsonRpcBatchProvider,
  StaticJsonRpcProvider,
} from '@ethersproject/providers';
import { environment } from '../../../../environments/environment';
import { useAccount } from '../../shared/hooks/use-account';

const contract = new Contract(
  environment.imx.packets,
  PACKETS_ABI,
  new JsonRpcBatchProvider(environment.imxRpcURL)
);

export function useContract() {
  return contract;
}
