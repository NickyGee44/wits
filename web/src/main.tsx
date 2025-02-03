import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import App from './app/app';
import { abstract } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { AbstractWalletProvider } from '@abstract-foundation/agw-react';
import { QueryClient } from '@tanstack/react-query';

export const publicClient = createPublicClient({
  chain: abstract,
  transport: http(),
});

const config = {
  chain: abstract,
  transport: http(abstract.rpcUrls.default.http[0]),
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
