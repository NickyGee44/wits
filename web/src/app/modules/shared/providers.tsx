import { Web3Provider } from '@ethersproject/providers';
import { passport, config, checkout } from '@imtbl/sdk';
import { Context, createContext, useContext, useEffect } from 'react';

const passportInstance = new passport.Passport({
  baseConfig: {
    environment: config.Environment.SANDBOX,
    publishableKey: 'pk_imapik-test-1-ps6t8Kn5HcDvXXPeMP',
  },
  clientId: 'edXzCFlOvpQ9qCDjiBFQlFb9YgRK5RYh',
  redirectUri:
    'https://deploy-preview-2--papaya-faun-a29515.netlify.app/redirect',
  logoutRedirectUri:
    'https://deploy-preview-2--papaya-faun-a29515.netlify.app/logout',
  audience: 'platform_api',
  scope: 'openid offline_access email transact',
});

const checkoutSDK = new checkout.Checkout({
  baseConfig: {
    environment: config.Environment.SANDBOX,
    publishableKey: 'pk_imapik-test-1-ps6t8Kn5HcDvXXPeMP',
  },
  bridge: {
    enable: true,
  },
  onRamp: {
    enable: true,
  },
  swap: {
    enable: true,
  },
  passport: passportInstance,
});

const passportProvider = passportInstance.connectEvm();
const provider = new Web3Provider(passportProvider);

export const providerContext: Context<{
  provider: Web3Provider;
  passport: passport.Passport;
  checkoutSDK: checkout.Checkout;
}> = createContext({
  provider,
  passport: passportInstance,
  checkoutSDK,
});

interface ProviderProps {
  children: React.ReactNode;
}

export default ({ children }: ProviderProps) => {
  return (
    <providerContext.Provider
      value={{
        provider,
        passport: passportInstance,
        checkoutSDK,
      }}
    >
      {children}
    </providerContext.Provider>
  );
};

export function useProvider() {
  const provider = useContext(providerContext);
  return provider;
}
