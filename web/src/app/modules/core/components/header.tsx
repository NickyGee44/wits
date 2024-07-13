import { useMemo } from 'react';
import { useStage } from '../hooks/use-stage';
import { ConnectButton } from './buttons';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="flex flex-col justify-center w-full relative">
      <div className="flex flex-col space-y-4 justify-center items-center pt-6">
        <img src="/assets/images/logo.png" alt="logo" className="max-w-[240px]" />
        {/* <div className="font-dragon text-gold text-xl">{title}</div> */}
      </div>
      <div className="lg:absolute right-0 top-0 flex flex-row justify-center items-center m-4">
        <ConnectButton />
      </div>
    </div>
  );
}

interface HeaderContainerProps {
  packets: `0x${string}`;
}

export function HeaderContainer(props: HeaderContainerProps) {
  const stage = useStage(props.packets);
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
