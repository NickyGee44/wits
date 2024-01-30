import { BurnContainer } from './modules/burn/components/container';
import { Container } from './modules/core/components/containers';
import { HeaderContainer } from './modules/core/components/header';
import { Tab, TabBody } from './modules/core/components/tabs';
import { useTabs } from './modules/core/hooks/use-tabs';
import { MintContainer } from './modules/mint/components/container';
import { environment } from '../environments/environment';
import { Toaster } from 'react-hot-toast';
import { useAccount } from '../app/modules/shared/hooks/use-account';
import { useCallback, useEffect, useMemo } from 'react';
import { usePassport } from './modules/shared/hooks/use-passport';
import { PrimaryButton } from './modules/core/components/buttons';
import { useProvider } from './modules/shared/providers';
import { checkout } from '@imtbl/sdk';
import { userInfo } from 'os';
import { useConnectUI } from './modules/shared/hooks/use-connect-ui';
import { useWalletUI } from './modules/shared/hooks/use-wallet-ui';
import { constants } from 'ethers';
import { useStage } from './modules/core/hooks/use-stage';
import { useTotalSupply } from './modules/core/hooks/use-total-supply';
import { Packets } from './modules/core/constants/packets';
import { useMinted } from './modules/mint/hooks/use-mint';

const network = 'imx';

export function App() {
  const { checkoutSDK } = useProvider();
  const { fetchUser, loginCallback, logoutCallback, authenticated } =
    usePassport();
  const { fetchConnect } = useConnectUI();
  const { tabIndex, setTabIndex } = useTabs();

  const pathName = window.location.pathname.split('/')[1];
  const { address, connect } = useAccount();
  const { fetchUI: fetchWalletUI } = useWalletUI();

  const { fetchMinted } = useMinted(address ?? constants.AddressZero);

  useEffect(() => {
    if (pathName === 'redirect') {
      loginCallback();
    }
    if (pathName === 'logout') {
      logoutCallback();
    }
  }, [pathName, loginCallback, logoutCallback]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchConnect();
    fetchWalletUI();
  }, []);

  useMemo(() => {
    (async () => {
      const metamaskProviderResult = await checkoutSDK.createProvider({
        walletProviderName: checkout.WalletProviderName.METAMASK,
      });

      const isMetamaskConnected = await checkoutSDK.checkIsWalletConnected({
        provider: metamaskProviderResult.provider,
      });

      if (isMetamaskConnected.isConnected) {
        await connect(metamaskProviderResult.provider);
        return;
      }

      const passportProviderResult = await checkoutSDK.createProvider({
        walletProviderName: checkout.WalletProviderName.PASSPORT,
      });

      const isPassportConnected = await checkoutSDK.checkIsWalletConnected({
        provider: passportProviderResult.provider,
      });

      if (isPassportConnected.isConnected || authenticated) {
        await connect(passportProviderResult.provider);
        return;
      }
    })();
  }, [authenticated, checkoutSDK, connect]);

  const { fetchStage } = useStage();

  const {
    totalSupply: singleSupply,
    fetchTotalSupply: fetchSingleTotalSupply,
  } = useTotalSupply(environment.imx.packets, Packets[0].id);
  const {
    totalSupply: boosterSupply,
    fetchTotalSupply: fetchBoosterTotalSupply,
  } = useTotalSupply(environment.imx.packets, Packets[1].id);
  const { totalSupply: jumboSupply, fetchTotalSupply: fetchJumboTotalSupply } =
    useTotalSupply(environment.imx.packets, Packets[2].id);
  const {
    totalSupply: mysterySupply,
    fetchTotalSupply: fetchMysteryTotalSupply,
  } = useTotalSupply(environment.imx.packets, Packets[3].id);

  const fetchData = useCallback(async () => {
    Promise.all([
      fetchSingleTotalSupply(),
      fetchBoosterTotalSupply(),
      fetchJumboTotalSupply(),
      fetchMysteryTotalSupply(),
      fetchMinted(),
    ]);
  }, [
    fetchSingleTotalSupply,
    fetchBoosterTotalSupply,
    fetchJumboTotalSupply,
    fetchMysteryTotalSupply,
    fetchMinted,
  ]);

  useEffect(() => {
    fetchStage();
    fetchData();
    const id = setInterval(() => {
      fetchStage();
      fetchData();
    }, 15000);
    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    fetchStage();
  }, []);

  return (
    <main className="min-h-screen text-light-gold">
      <Toaster />
      <div className="flex flex-col w-10/12 mx-auto py-8 justify-center items-center space-y-16">
        <HeaderContainer packets={environment[network].packets} />
        <div
          id="connect"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
        <div
          id="wallet"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
        <div
          id="swap"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
        <div
          id="bridge"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Tab
            text="MINT A PACK"
            handleClick={() => setTabIndex(0)}
            isActive={tabIndex === 0}
          />
          <Tab
            text="OPEN PACK"
            disabled
            handleClick={() => setTabIndex(1)}
            isActive={tabIndex === 1}
          />
        </div>
        <Container hasBorder isOpaque>
          <div className="w-11/12 mx-auto">
            <TabBody activeIndex={tabIndex} tabIndex={0}>
              <div />
              <MintContainer
                packets={environment[network].packets}
                account={address ?? constants.AddressZero}
                singleSupply={singleSupply}
                boosterSupply={boosterSupply}
                jumboSupply={jumboSupply}
                mysterySupply={mysterySupply}
              />
            </TabBody>
            {/* <TabBody activeIndex={tabIndex} tabIndex={1}>
                  <OpenContainer
                    packets={environment[network].packets}
                    account={address}
                  />
                </TabBody> */}
          </div>
        </Container>
      </div>
    </main>
  );
}

export default App;
