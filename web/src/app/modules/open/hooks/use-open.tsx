import { useState, useCallback, useEffect } from 'react';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { sortBy } from 'lodash';
import toast from 'react-hot-toast';
import { decodeEventLog, Log } from 'viem';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { dripGas } from '../../../utils';
import { TransactionLink } from '../../core/components/transaction';
import { CARDS_ABI, PACKETS_ABI } from '../../core/constants/abi';
import { environment } from '../../../../environments/environment';

const admin_username = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
const admin_password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

if (!admin_username || !admin_password) {
  throw new Error('Missing admin credentials');
}

// Define the structure of the PacketOpened event
interface PacketOpenedEvent {
  eventName: 'PacketOpened';
  args: {
    cardId: bigint;
    startingId: bigint;
    total: bigint;
  };
}

export function useOpen(
  packets: `0x${string}`,
  ids: number[],
  amounts: number[],
  reset: () => void
) {
  const { address } = useAccount();
  const addRecentTransaction = useAddRecentTransaction();
  const [idsByPackets, setIdsByPackets] = useState<
    { id: number; cards: number[] }[]
  >([]);
  const [apiResult, setApiResult] = useState<any>(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const calculateIdsByPackets = useCallback(
    (logs: Log[]) => {
      return sortBy(
        logs
          .filter((log) => log.address.toLowerCase() === packets.toLowerCase())
          .map((log) => {
            try {
              return decodeEventLog({
                abi: [...CARDS_ABI, ...PACKETS_ABI],
                data: log.data,
                topics: log.topics,
                strict: false,
              }) as PacketOpenedEvent;
            } catch {
              return null;
            }
          })
          .filter(
            (log): log is PacketOpenedEvent => log?.eventName === 'PacketOpened'
          )
      ).map((log) => {
        return {
          id: Number(log.args.cardId),
          cards: new Array(Number(log.args.total))
            .fill(0)
            .map((_, i) => Number(log.args.startingId) + i),
        };
      });
    },
    [packets]
  );

  const {
    writeAsync,
    data: writeData,
    isSuccess: isWriteSuccess,
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

  const {
    data: txData,
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  useEffect(() => {
    const processTransaction = async () => {
      if (isTxSuccess && txData) {
        const calculatedIdsByPackets = calculateIdsByPackets(txData.logs);

        setIsApiLoading(true);
        try {
          const ApiData = calculatedIdsByPackets.map((packet) => {
            return {
              packetType: packet.id,
              startTokenId: packet.cards[0],
              endTokenId: packet.cards[packet.cards.length - 1],
            };
          });

          const auth_reponse = await fetch(environment.api.auth, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: admin_username,
              password: admin_password,
            }),
          });

          const auth_result = await auth_reponse.json();
          const token = auth_result.access_token;

          if (!token) {
            throw new Error('Invalid token');
          }

          await fetch(environment.api.openPackets, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify(ApiData),
          });
          setIdsByPackets(calculatedIdsByPackets);
        } catch (error) {
          console.error('API call failed:', error);
          toast.error('Server Error');
        } finally {
          setIsApiLoading(false);
        }
      }
    };

    processTransaction();
  }, [isTxSuccess, txData, calculateIdsByPackets]);

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
    isSuccess: isWriteSuccess && isTxSuccess,
    writeReset,
    isLoading: isTxLoading || isApiLoading,
    apiResult,
  };
}
