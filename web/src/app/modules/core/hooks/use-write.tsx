import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import toast from 'react-hot-toast';
import { formatError } from '../utils/error';

export function useWrite(
  config: any,
  stateReset?: () => void,
  successMessage?: string,
  loadingMessage?: string
) {
  const { config: prepareConfig, error } = usePrepareContractWrite({
    ...config,
  });
  const { data, writeAsync, reset } = useContractWrite({
    ...prepareConfig,
    onSettled: stateReset,
    onSuccess: () => {
      toast.success(successMessage || 'Transaction sent!');
      reset();
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
  });

  const action = async () => {
    if (error) {
      toast.error(formatError(error));
      return;
    }
    let loading;
    try {
      loading = toast.loading(loadingMessage || 'Sending transaction...');
      writeAsync && (await writeAsync());
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
    }
  };

  return {
    data,
    action,
    useContractWrite,
  };
}
