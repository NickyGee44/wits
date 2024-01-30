import { checkout } from '@imtbl/sdk';
import { atom, useAtom } from 'jotai';
import { useProvider } from '../providers';
import { useCallback, useEffect } from 'react';
import { useAccount } from './use-account';

const connectAtom = atom<checkout.Widget<
  typeof checkout.WidgetType.WALLET
> | null>(null);

const swapAtom = atom<checkout.Widget<typeof checkout.WidgetType.SWAP> | null>(
  null
);

const bridgeAtom = atom<checkout.Widget<
  typeof checkout.WidgetType.BRIDGE
> | null>(null);

export function useWalletUI() {
  const [swapUI, setSwapUI] = useAtom(swapAtom);
  const [bridgeUI, setBridgeUI] = useAtom(bridgeAtom);
  const [ui, setUI] = useAtom(connectAtom);

  const { checkoutSDK } = useProvider();
  const { disconnect } = useAccount();

  const fetchUI = useCallback(async () => {
    const widgets = await checkoutSDK.widgets({
      config: { theme: checkout.WidgetTheme.DARK },
    });
    const _ui = widgets.create(checkout.WidgetType.WALLET);
    setUI(_ui);
  }, [checkoutSDK, setUI]);

  const fetchSwapUI = useCallback(async () => {
    const widgets = await checkoutSDK.widgets({
      config: { theme: checkout.WidgetTheme.DARK },
    });
    const _ui = widgets.create(checkout.WidgetType.SWAP);
    setSwapUI(_ui);
  }, [checkoutSDK, setSwapUI]);

  const fetchBridgeUI = useCallback(async () => {
    const widgets = await checkoutSDK.widgets({
      config: { theme: checkout.WidgetTheme.DARK },
    });
    const _ui = widgets.create(checkout.WidgetType.BRIDGE);
    setBridgeUI(_ui);
  }, [checkoutSDK, setBridgeUI]);

  const showUI = useCallback(
    async (id: string) => {
      ui?.mount(id);
    },
    [ui]
  );

  const showSwapUI = useCallback(
    async (id: string) => {
      swapUI?.mount(id);
    },
    [swapUI]
  );

  const showBridgeUI = useCallback(
    async (id: string) => {
      bridgeUI?.mount(id);
    },
    [bridgeUI]
  );

  useEffect(() => {
    ui?.addListener(checkout.WalletEventType.CLOSE_WIDGET, () => {
      console.log('close !!!', ui);
      ui.unmount();
    });

    return () => {
      ui?.removeListener(checkout.WalletEventType.CLOSE_WIDGET);
    };
  }, [ui]);

  useEffect(() => {
    ui?.addListener(checkout.WalletEventType.DISCONNECT_WALLET, (data) => {
      disconnect();
      ui.unmount();
    });

    ui?.addListener(checkout.OrchestrationEventType.REQUEST_BRIDGE, (data) => {
      console.log('bridge', data);
      bridgeUI?.mount('bridge');
    });

    swapUI?.addListener(checkout.SwapEventType.CLOSE_WIDGET, (data) => {
      console.log('close !!!', data);
      swapUI.unmount();
    });

    bridgeUI?.addListener(checkout.BridgeEventType.CLOSE_WIDGET, (data) => {
      console.log('close !!!', data);
      bridgeUI.unmount();
    });

    ui?.addListener(checkout.OrchestrationEventType.REQUEST_SWAP, (data) => {
      console.log('swap', data);
      swapUI?.mount('swap');
    });

    ui?.addListener(
      checkout.OrchestrationEventType.REQUEST_SWAP,
      (data: checkout.RequestSwapEvent) => {
        ui.unmount();
        swapUI?.mount('swap', { fromTokenAddress: data.fromTokenAddress });
      }
    );

    return () => {
      ui?.removeListener(checkout.WalletEventType.DISCONNECT_WALLET);
    };
  }, [ui, bridgeUI, swapUI]);

  return {
    ui,
    fetchUI: () => {
      fetchUI();
      fetchBridgeUI();
      fetchSwapUI();
    },
    showUI,
    showSwapUI,
    showBridgeUI,
  };
}
