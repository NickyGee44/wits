import { useCallback } from 'react';
import { useProvider } from '../providers';
import { Signer } from 'ethers';
import { atom, useAtom } from 'jotai';
import { Web3Provider } from '@ethersproject/providers';
import { environment } from '../../../../environments/environment';

const loadingAtom = atom<boolean>(false);
const addressAtom = atom<`0x${string}` | undefined>(undefined);
const signerAtom = atom<Signer | undefined>(undefined);
const providerAtom = atom<Web3Provider | undefined>(undefined);

export function useAccount() {
  const [provider, setProvider] = useAtom(providerAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [signer, setSigner] = useAtom(signerAtom);

  const isMain = useCallback(async () => {
    const network = await provider?.getNetwork();
    console.log(network?.chainId, environment.imx.chainId);
    return network?.chainId === environment.imx.chainId;
  }, [provider]);

  const connect = useCallback(async (provider: Web3Provider) => {
    try {
      setLoading(true);
      if (!provider) return;
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      checkoutSDK.connect({ provider });
      setSigner(signer);
      const address = await signer.getAddress();
      setAddress(address as `0x${string}`);
      setProvider(provider);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      setLoading(true);
      setSigner(undefined);
      setAddress(undefined);
      setProvider(undefined);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const { checkoutSDK } = useProvider();

  return {
    loading,
    setLoading,
    setAddress,
    setSigner,
    address,
    connect,
    signer,
    isMain,
    disconnect,
  };
}
