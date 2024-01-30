import { useCallback, useEffect, useMemo } from 'react';
import { usePacket } from '../hooks/use-packet';
import { MintTab } from './mint-tab';
import { useTotalSupply } from '../../core/hooks/use-total-supply';
import { usePrice } from '../../core/hooks/use-price';
import { useMinted, usePresaleMint, usePublicMint } from '../hooks/use-mint';
import { Packets } from '../../core/constants/packets';
import { useStage } from '../../core/hooks/use-stage';
import { useContract } from '../../core/hooks/use-contract';
import { BigNumber, constants } from 'ethers';
import { useBurnMint } from '../../burn/hooks/use-burn-mint';

interface MintContainerProps {
  packets: `0x${string}`;
  account: `0x${string}`;
  singleSupply: number;
  boosterSupply: number;
  jumboSupply: number;
  mysterySupply: number;
}

export function MintContainer({
  singleSupply,
  boosterSupply,
  jumboSupply,
  mysterySupply,

  ...props
}: MintContainerProps) {
  const { stage } = useStage();
  const { minted } = useMinted(props.account);

  const { price: singlePrice, fetchPrice: fetchSinglePrice } = usePrice(
    props.packets,
    Packets[0].id
  );
  const { price: boosterPrice, fetchPrice: fetchBoosterPrice } = usePrice(
    props.packets,
    Packets[1].id
  );
  const { price: jumboPrice, fetchPrice: fetchJumboPrice } = usePrice(
    props.packets,
    Packets[2].id
  );
  const { price: mysteryPrice, fetchPrice: fetchMysteryPrice } = usePrice(
    props.packets,
    Packets[3].id
  );

  useEffect(() => {
    fetchSinglePrice();
    fetchBoosterPrice();
    fetchJumboPrice();
    fetchMysteryPrice();
  }, [fetchSinglePrice, fetchBoosterPrice, fetchJumboPrice, fetchMysteryPrice]);

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
      return acc.add(BigNumber.from(curr.count).mul(curr.price));
    }, BigNumber.from(0));
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
  } = usePublicMint(props.packets, stage, mintRequests, value, reset);

  const {
    write: presaleMint,
    isLive: presaleLive,
    loading: presaleLoading,
  } = usePresaleMint(
    props.packets,
    props.account,
    minted,
    stage,
    mintRequests,
    value,
    reset
  );

  const {
    write: burnMint,
    loading: burnLoading,
    assignedValue,
  } = useBurnMint();

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
      loading={publicLoading || presaleLoading || burnLoading}
      burnMint={burnMint}
      isShowBurnMint={assignedValue > 0}
    />
  );
}
