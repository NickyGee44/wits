import { useEffect, useMemo } from 'react';
import { usePresaleMint } from '../../mint/hooks/use-mint';
import { useStage } from '../hooks/use-stage';
import { ConnectButton, PrimaryButton } from './buttons';
import { useAccount } from '../../shared/hooks/use-account';
import { usePassport } from '../../shared/hooks/use-passport';
import { useConnectUI } from '../../shared/hooks/use-connect-ui';
import { useWalletUI } from '../../shared/hooks/use-wallet-ui';
import { useContract } from '../hooks/use-contract';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { login, loading: userLoading, logout, user } = usePassport();
  const { showConnect } = useConnectUI();
  const { showUI: showBalance } = useWalletUI();
  const { address, loading: walletLoading } = useAccount();

  return (
    <div className="flex flex-col justify-center w-full relative">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <img src="/assets/images/logo.png" alt="logo" className="max-w-sm" />
        <div className="font-dragon text-gold text-xl">{title}</div>
      </div>
      <div className="block lg:absolute right-0 top-0 flex flex-row justify-center items-center m-4">
        {address ? (
          <PrimaryButton handleClick={() => showBalance('wallet')}>
            {address
              ? `${address.slice(0, 6)}...${address.slice(
                  address.length - 4,
                  address.length
                )}`
              : 'Wallet'}
          </PrimaryButton>
        ) : (
          <PrimaryButton handleClick={() => showConnect('connect')}>
            Connect
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}

interface HeaderContainerProps {
  packets: `0x${string}`;
}

export function HeaderContainer(props: HeaderContainerProps) {
  const { stage } = useStage();

  const title = useMemo(() => {
    if (stage === 0) {
      return 'Mint is not live';
    }
    if (stage === 1) {
      return 'Presale is live';
    }
    if (stage === 2) {
      return 'Public mint is live';
    }
    return '';
  }, [stage]);
  return <Header title={title} />;
}
