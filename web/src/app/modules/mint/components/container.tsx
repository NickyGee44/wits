import { useMemo } from 'react';
import { usePacket } from '../hooks/use-packet';
import { MintTab } from './mint-tab';
import { useTotalSupply } from '../../core/hooks/use-total-supply';
import { usePrice } from '../../core/hooks/use-price';
import { usePresaleMint, usePublicMint } from '../hooks/use-mint';

interface MintContainerProps {
  packets: `0x${string}`;
  account: `0x${string}`;
}

export function MintContainer(props: MintContainerProps) {
  const singleSupply = useTotalSupply(props.packets, 1);
  const boosterSupply = useTotalSupply(props.packets, 2);
  const jumboSupply = useTotalSupply(props.packets, 3);
  const mysterySupply = useTotalSupply(props.packets, 4);

  const singlePrice = usePrice(props.packets, 1);
  const boosterPrice = usePrice(props.packets, 2);
  const jumboPrice = usePrice(props.packets, 3);
  const mysteryPrice = usePrice(props.packets, 4);

  const single = usePacket(
    1,
    'single',
    singleSupply,
    singlePrice,
    '15',
    '00',
    5
  );
  const booster = usePacket(
    2,
    'booster',
    boosterSupply,
    boosterPrice,
    '10',
    '13',
    20
  );
  const jumbo = usePacket(3, 'jumbo', jumboSupply, jumboPrice, '9', '32', 50);
  const mystery = usePacket(
    4,
    'mystery',
    mysterySupply,
    mysteryPrice,
    '7',
    '50',
    25
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

  const { isLive: publicLive, write: publicMint } = usePublicMint(
    props.packets,
    mintRequests,
    value,
    reset
  );

  const { write: presaleMint, isLive: presaleLive } = usePresaleMint(
    props.packets,
    props.account,
    mintRequests,
    value,
    reset
  );

  const write = async () => {
    if (presaleLive) {
      await presaleMint();
    } else if (publicLive) {
      await publicMint();
    }
  };

  return <MintTab write={write} cards={[single, booster, jumbo, mystery]} />;
}
