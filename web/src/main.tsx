import '@rainbow-me/rainbowkit/styles.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import App from './app/app';
import { environment } from './environments/environment';
import { skaleNebulaTestnetCustom } from './app/modules/core/constants/customNetworks';
import { createPublicClient, createWalletClient, http } from 'viem';

const { chains } = configureChains(
  [skaleNebulaTestnetCustom],
  [alchemyProvider({ apiKey: environment.ALCHEMY_KEY }), publicProvider()]
);

export const publicClient = createPublicClient({
  chain: skaleNebulaTestnetCustom,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: skaleNebulaTestnetCustom,
  transport: http(),
});

const { connectors } = getDefaultWallets({
  appName: 'Wits',
  projectId: '151fefc365d4d7e68f0272463d8e7c34',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} showRecentTransactions>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </StrictMode>
);
