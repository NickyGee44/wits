import { useMemo } from 'react';
import { usePacket } from '../hooks/use-packet';
import { MintTab } from './mint-tab';
import { useTotalSupply } from '../../core/hooks/use-total-supply';
import { usePrice } from '../../core/hooks/use-price';
import { usePresaleMint, usePublicMint } from '../hooks/use-mint';
import { Packets } from '../../core/constants/packets';

interface MintContainerProps {
  packets: `0x${string}`;
  account: `0x${string}`;
}

export function MintContainer(props: MintContainerProps) {
  const singleSupply = useTotalSupply(props.packets, Packets[0].id);
  const boosterSupply = useTotalSupply(props.packets, Packets[1].id);
  const jumboSupply = useTotalSupply(props.packets, Packets[2].id);
  const mysterySupply = useTotalSupply(props.packets, Packets[3].id);

  const singlePrice = usePrice(props.packets, Packets[0].id);
  const boosterPrice = usePrice(props.packets, Packets[1].id);
  const jumboPrice = usePrice(props.packets, Packets[2].id);
  const mysteryPrice = usePrice(props.packets, Packets[3].id);

  const single = usePacket(
    Packets[0].id,
    'single',
    singleSupply,
    singlePrice,
    '15',
    '00',
    Packets[0].count
  );
  const booster = usePacket(
    Packets[1].id,
    Packets[1].name,
    boosterSupply,
    boosterPrice,
    '10',
    '13',
    Packets[1].count
  );
  const jumbo = usePacket(
    Packets[2].id,
    Packets[2].name,
    jumboSupply,
    jumboPrice,
    '9',
    '32',
    Packets[2].count
  );
  const mystery = usePacket(
    Packets[3].id,
    Packets[3].name,
    mysterySupply,
    mysteryPrice,
    '7',
    '50',
    Packets[3].count
  );

  const cards = useMemo(
    () => [single, booster, jumbo, mystery],
    [single, booster, jumbo, mystery]
  );

  const value = useMemo(() => {
    return cards.reduce((acc, curr) => {
      return acc + BigInt(curr.count) * curr.price;
    }, BigInt(0));
  }, [cards]);

  const mintRequests = useMemo(
    () =>
      cards.map(
        (card) => ({
          id: card.id,
          amount: card.count,
        }),
        [cards]
      ),
    [cards]
  );

  const reset = () => {
    cards.forEach((card) => {
      card.reset();
    });
  };

  const {
    isLive: publicLive,
    write: publicMint,
    loading: publicLoading,
  } = usePublicMint(props.packets, mintRequests, value, reset);

  const {
    write: presaleMint,
    totalMintable,
    isLive: presaleLive,
    loading,
  } = usePresaleMint(props.packets, props.account, mintRequests, value, reset);

  const write = async () => {
    if (presaleLive) {
      await presaleMint();
    } else if (publicLive) {
      await publicMint();
    }
  };

  return (
    <MintTab
      write={write}
      cards={[single, booster, jumbo, mystery]}
      loading={loading || publicLoading}
      presaleLive={presaleLive}
      publicLive={publicLive}
      totalMintable={totalMintable}
    />
  );
}
