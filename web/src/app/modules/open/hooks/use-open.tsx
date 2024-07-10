'use client';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { sortBy } from 'lodash';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { decodeEventLog } from 'viem';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { dripGas } from '../../../utils';
import { TransactionLink } from '../../core/components/transaction';
import { CARDS_ABI, PACKETS_ABI } from '../../core/constants/abi';

export function useOpen(
  packets: `0x${string}`,
  ids: number[],
  amounts: number[],
  reset: () => void
) {
  const { address } = useAccount();
  const addRecentTransaction = useAddRecentTransaction();

  const {
    writeAsync,
    data,
    isSuccess,
    reset: writeReset,
  } = useContractWrite({
    abi: PACKETS_ABI,
    address: packets,
    functionName: 'open',
    args: [ids, amounts],
    onSettled: reset,
    onSuccess: (data) => {
      toast.success(<TransactionLink tx={data.hash} />, { duration: 5000 });
      addRecentTransaction({
        hash: data.hash,
        description: 'Open Pack',
      });
    },
    onError: (error) => {
      toast.error('Error opening');
      console.error(error);
    },
  });

  const tx = data?.hash;

  const { data: txData } = useWaitForTransaction({ hash: tx });

  const logs = txData?.logs;

  const idsByPackets = useMemo(() => {
    return (
      sortBy(
        logs
          ?.filter((log) => log.address.toLowerCase() === packets.toLowerCase())
          .map((log) =>
            decodeEventLog({
              abi: [...CARDS_ABI, ...PACKETS_ABI],
              data: log.data,
              topics: log.topics,
              strict: false,
            })
          )
          .filter((log) => log?.eventName === 'PacketOpened'),
        'args.startingId'
      ) as {
        eventName: string;
        args: { cardId: bigint; startingId: bigint; total: bigint };
      }[]
    ).map((log) => {
      return {
        id: Number(log.args.cardId),
        cards: new Array(Number(log.args.total))
          .fill(0)
          .map((_, i) => Number(log.args.startingId) + i),
      };
    });
  }, [logs]);

  const open = async () => {
    try {
      if (address) {
        await dripGas(address);

        await writeAsync();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    open,
    idsByPackets,
    isSuccess,
    writeReset,
  };
}
