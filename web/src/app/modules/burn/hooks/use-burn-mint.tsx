import { useCallback, useEffect } from 'react';
import { useAccount } from '../../shared/hooks/use-account';
import { useApi } from './use-burn-api';
import { useContract } from '../../core/hooks/use-contract';
import { atom, useAtom } from 'jotai';
import toast from 'react-hot-toast';
import { environment } from '../../../../environments/environment';

const loadingAtom = atom(false);

export function useBurnMint() {
  const [loading, setLoading] = useAtom(loadingAtom);
  const { address, isMain, signer } = useAccount();
  const { fetchSignature, assignedValue } = useApi(address!);
  const contract = useContract();

  useEffect(() => {
    if (address) fetchSignature();
  }, [fetchSignature, address]);

  const write = useCallback(async () => {
    try {
      setLoading(true);
      if (signer) {
        const _isMain = await isMain();
        if (!_isMain) {
          toast.error('Please switch to mainnet');
          return;
        }

        const json = await fetchSignature();
        const balance = await signer.getBalance();
        if (balance.lt(json.request.amount)) {
          toast.error('Insufficient balance');
          return;
        }
        const tx = await contract
          .connect(signer)
          .burnMint(json.request, json.signature, {
            value: json.request.amount,
          });
        await tx.wait();
        toast.success(
          <div>
            Minted{' '}
            <a
              href={environment.imx.explorer + '/tx/' + tx.hash}
              target="_blank"
            >
              Check here for transaction
            </a>
          </div>
        );
        fetchSignature();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [address, fetchSignature]);

  return {
    write,
    loading,
    assignedValue,
  };
}
