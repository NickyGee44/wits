import { useAccount } from 'wagmi';
import { BurnContainer } from './modules/burn/components/container';
import { Container } from './modules/core/components/containers';
import { HeaderContainer } from './modules/core/components/header';
import { Tab, TabBody } from './modules/core/components/tabs';
import { useTabs } from './modules/core/hooks/use-tabs';
import { MintContainer } from './modules/mint/components/container';
import { OpenContainer } from './modules/open/components/container';
import { environment } from '../environments/environment';
import { Toaster } from 'react-hot-toast';

const network = 'goerli';

export function App() {
  const { address } = useAccount();
  const { tabIndex, setTabIndex } = useTabs();
  return (
    <main className="min-h-screen text-light-gold">
      <Toaster />
      <div className="flex flex-col w-10/12 mx-auto py-8 justify-center items-center space-y-16">
        <HeaderContainer packets={environment[network].packets} />
        {address && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Tab
                text="BURN TO MINT"
                handleClick={() => setTabIndex(0)}
                isActive={tabIndex === 0}
              />
              <Tab
                text="MINT A PACK"
                handleClick={() => setTabIndex(1)}
                isActive={tabIndex === 1}
              />
              <Tab
                text="OPEN PACK"
                handleClick={() => setTabIndex(2)}
                isActive={tabIndex === 2}
              />
            </div>
            <Container hasBorder isOpaque>
              <div className="w-11/12 mx-auto">
                <TabBody activeIndex={tabIndex} tabIndex={0}>
                  <BurnContainer
                    gbabies={environment[network].gBabies}
                    quillAndInk={environment[network].quillAndInk}
                    packets={environment[network].packets}
                    account={address}
                  />
                </TabBody>
                <TabBody activeIndex={tabIndex} tabIndex={1}>
                  <MintContainer
                    packets={environment[network].packets}
                    account={address}
                  />
                </TabBody>
                <TabBody activeIndex={tabIndex} tabIndex={2}>
                  <OpenContainer
                    packets={environment[network].packets}
                    account={address}
                  />
                </TabBody>
              </div>
            </Container>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
