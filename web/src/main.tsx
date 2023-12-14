import '@rainbow-me/rainbowkit/styles.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import App from './app/app';
import { environment } from './environments/environment';

const { chains, publicClient } = configureChains(
  // [goerli],
  [mainnet],
  [alchemyProvider({ apiKey: environment.ALCHEMY_KEY }), publicProvider()]
);

// console.log(environment.ALCHEMY_KEY, publicClient({ chainId: 80001 }));

const { connectors } = getDefaultWallets({
  appName: 'Wits',
  projectId: '848e5ecc8a169ee608e28bd5df264f9d',
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
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </StrictMode>
);
