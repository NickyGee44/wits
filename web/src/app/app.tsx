import { Toaster } from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { environment } from '../environments/environment';
import { ConnectButton } from './modules/core/components/buttons';
import { Container } from './modules/core/components/containers';
import { HeaderContainer } from './modules/core/components/header';
import { TabBody } from './modules/core/components/tabs';
import { useTabs } from './modules/core/hooks/use-tabs';
import { OpenContainer } from './modules/open/components/container';

// const network = environment.chain === 'mainnet' ? 'mainnet' : 'goerli';
const network = 'abstract';

export function App() {
  const { address } = useAccount();
  const { tabIndex, setTabIndex } = useTabs();

  return (
    <main className={'min-h-screen text-light-gold'}>
      <Toaster />
      <div className="flex flex-col w-10/12 mx-auto py-2 justify-center items-center space-y-4">
        <HeaderContainer packets={environment[network].packets} />
        <span className="pb-4 text-gold font-lato text-lg text-center">
          It's time to open the packets and reveal the cards you have got
          <br />
          Connect Wallet and Open your Packets
          <br />
          <a
            href={'https://www.wits.academy/'}
            className="underline-offset-2 underline"
            target="_blank"
            rel="noreferrer"
          >
            https<span className="font-sans">://</span>www
            <span className="font-sans">.</span>wits
            <span className="font-sans">.</span>
            academy
          </a>
        </span>

        <Container hasBorder isOpaque>
          <div className="w-11/12 mx-auto">
            {!address ? (
              <div className="flex flex-row justify-center items-center min-h-[10rem] lg:min-h-[50rem]">
                <ConnectButton />
              </div>
            ) : (
              <TabBody activeIndex={tabIndex} tabIndex={0}>
                <OpenContainer
                  packets={environment[network].packets}
                  account={address ?? '0x'}
                />
              </TabBody>
            )}
          </div>
        </Container>
      </div>
    </main>
  );
}

export default App;
