import { checkout } from '@imtbl/sdk';
import { atom, useAtom } from 'jotai';
import { useProvider } from '../providers';
import { useCallback, useEffect } from 'react';
import { useAccount } from './use-account';

const connectAtom = atom<checkout.Widget<
  typeof checkout.WidgetType.CONNECT
> | null>(null);

export function useConnectUI() {
  const [connect, setConnect] = useAtom(connectAtom);
  const { connect: connectAction } = useAccount();
  const { checkoutSDK } = useProvider();

  const fetchConnect = useCallback(async () => {
    const widgets = await checkoutSDK.widgets({
      config: { theme: checkout.WidgetTheme.DARK },
    });
    const connect = widgets.create(checkout.WidgetType.CONNECT);
    setConnect(connect);
  }, [checkoutSDK, setConnect]);

  const showConnect = useCallback(
    async (id: string) => {
      connect?.mount(id);
    },
    [connect]
  );

  useEffect(() => {
    if (!connect) return;
    connect.addListener(checkout.ConnectEventType.CLOSE_WIDGET, () => {
      connect.unmount();
    });

    return () => {
      connect.removeListener(checkout.ConnectEventType.CLOSE_WIDGET);
    };
  }, [connect]);

  useEffect(() => {
    if (!connect) return;
    connect.addListener(checkout.ConnectEventType.SUCCESS, async (event) => {
      await connectAction(event.provider);
      connect.unmount();
    });

    return () => {
      connect.removeListener(checkout.ConnectEventType.SUCCESS);
    };
  }, [connect]);

  return {
    fetchConnect,
    connect,
    showConnect,
  };
}
