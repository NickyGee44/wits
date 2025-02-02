import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import App from './app/app';
import { abstractTestnet } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { AbstractWalletProvider } from '@abstract-foundation/agw-react';
import { abstractTestnetRPC } from './app/modules/core/constants/utils';
import { QueryClient } from '@tanstack/react-query';

export const publicClient = createPublicClient({
  chain: abstractTestnet,
  transport: http(),
});

const config = {
  chain: abstractTestnet,
  transport: http(abstractTestnetRPC),
};

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <AbstractWalletProvider
      chain={config.chain}
      transport={config.transport}
      queryClient={queryClient}
    >
      <RainbowKitProvider>
        <App />
      </RainbowKitProvider>
    </AbstractWalletProvider>
  </StrictMode>
);
