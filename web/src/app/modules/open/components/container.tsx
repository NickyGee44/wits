import { Packets } from '../../core/constants/packets';
import { useBalanceOfERC1155 } from '../../core/hooks/use-balance-of';
import { useOpen } from '../hooks/use-open';
import { usePacket } from '../hooks/use-packet';
import { OpenModal } from './open-modal';
import { OpenTab } from './open-tab';

interface OpenContainerProps {
  packets: `0x${string}`;
  account: `0x${string}`;
}

export function OpenContainer({ packets, account }: OpenContainerProps) {
  const singleBalance = useBalanceOfERC1155(packets, account, Packets[0].id);
  const boosterBalance = useBalanceOfERC1155(packets, account, Packets[1].id);
  const jumboBalance = useBalanceOfERC1155(packets, account, Packets[2].id);
  const mysteryBalance = useBalanceOfERC1155(packets, account, Packets[3].id);

  const single = usePacket(
    Packets[0].id,
    Packets[0].name,
    singleBalance,
    Packets[0].count
  );
  const booster = usePacket(
    Packets[1].id,
    Packets[1].name,
    boosterBalance,
    Packets[1].count
  );
  const jumbo = usePacket(
    Packets[2].id,
    Packets[2].name,
    jumboBalance,
    Packets[2].count
  );
  const mystery = usePacket(
    Packets[3].id,
    Packets[3].name,
    mysteryBalance,
    Packets[3].count
  );

  const cards = [single, booster, jumbo, mystery];

  const { open, idsByPackets, isSuccess, writeReset, isLoading } = useOpen(
    packets,
    cards.map((card) => card.id),
    cards.map((card) => card.count),
    () => {
      cards.forEach((card) => card.reset());
    }
  );

  return (
    <>
      <OpenTab
        idsByPackets={idsByPackets}
        isSuccess={isSuccess}
        open={open}
        cards={cards}
        isTxnLoading={isLoading}
      />
      <OpenModal idsByPackets={idsByPackets} writeReset={writeReset} />
    </>
  );
}
