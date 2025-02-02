import {
  useAccountModal,
  useAddRecentTransaction,
} from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { TransactionLink } from '../components/transaction';
import { formatError } from '../utils/error';

export function useWrite(
  config: any,
  stateReset?: () => void,
  context?: string,
  dontShowAccountModal?: boolean,
  successMessage?: string,
  loadingMessage?: string
) {
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [loading, setLoading] = useState(false);
  const addRecentTransaction = useAddRecentTransaction();
  const { openAccountModal } = useAccountModal();

  const { writeContract, reset } = useWriteContract({
    ...config,
    onSuccess: (hash: `0x${string}`) => {
      toast.success(successMessage || <TransactionLink tx={hash} />, {
        duration: 3000,
      });
      setHash(hash);
      addRecentTransaction({
        hash,
        description: context || 'Transaction',
        confirmations: 10,
      });
      if (!dontShowAccountModal) openAccountModal && openAccountModal();
      setLoading(false);
      reset();
    },
    onError: (error: any) => {
      setLoading(false);
      toast.error(formatError(error));
    },
    onSettled: () => {
      stateReset && stateReset();
      setLoading(false);
    },
  });

  const { isSuccess, data } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setHash(undefined);
      toast.success(
        successMessage || (
          <TransactionLink
            message="Successful! Click here to see transaction"
            tx={data.transactionHash}
          />
        ),
        {
          duration: 3000,
        }
      );
      setLoading(false);
      reset();
    }
  }, [isSuccess, data]);

  const action = async () => {
    try {
      setLoading(true);
      const loading = toast.loading(loadingMessage || 'Sending transaction...');
      writeContract(config);
      toast.dismiss(loading);
    } catch (error) {
      console.log(error);
      toast.error(formatError(error));
      setLoading(false);
    }
  };

  return {
    action,
    loading,
    data,
  };
}
