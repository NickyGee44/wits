import { BurnTab } from './burn-tab';
import { useBurnToMint } from '../hooks/use-burn-to-mint';
import { useGbabiesSelected } from '../hooks/use-gbabies-selected';
import { useQuillAndInkBalance } from '../hooks/use-quill-and-ink-balance';
import { useMemo } from 'react';
import { useBurnMint } from '../hooks/use-mint';
import { usePrice } from '../../core/hooks/use-price';
import { formatUnits } from 'viem';
import { useApproval } from '../../core/hooks/use-approval';
import { BigNumber, utils } from 'ethers';

interface BurnContainerProps {
  gbabies: `0x${string}`;
  quillAndInk: `0x${string}`;
  packets: `0x${string}`;
  account: `0x${string}`;
}

export function BurnContainer({
  gbabies,
  quillAndInk,
  packets,
  account,
}: BurnContainerProps) {
  const { quillAndInkBalance, gBabyTokens, quillAndInkTokens } = useBurnToMint(
    gbabies,
    quillAndInk,
    account
  );
  const { selectedIds, handleSelected, gbabiesReturnValue, clearSelected } =
    useGbabiesSelected(gBabyTokens);
  const {
    toBurn,
    balance,
    handleDecrement,
    handleIncrement,
    clearBalance,
    quillAndInkBurnReturnValue,
  } = useQuillAndInkBalance(quillAndInkBalance, quillAndInkTokens);
  const { price: priceForQuillAndInk } = usePrice(packets, 1);
  // const singleSupply = useTotalSupply(packets, 1);

  const price = useMemo(() => {
    return priceForQuillAndInk.mul(BigNumber.from(quillAndInkBurnReturnValue));
  }, [quillAndInkBurnReturnValue, priceForQuillAndInk]);

  const { write } = useBurnMint(packets, selectedIds, toBurn, price, () => {
    clearBalance();
    clearSelected();
  });

  const { isApprovedForAll: gbabiesIsApprovedForAll, write: gbabiesWrite } =
    useApproval(gbabies, account, packets, clearSelected);

  const showIsApprovedForAll = useMemo(() => {
    return !gbabiesIsApprovedForAll && selectedIds.length;
  }, [gbabiesIsApprovedForAll, selectedIds.length]);

  const buttonLabel = useMemo(() => {
    if (showIsApprovedForAll) {
      return 'Approve';
    }

    return 'Burn to Mint';
  }, [showIsApprovedForAll]);

  const buttonAction = useMemo(() => {
    if (showIsApprovedForAll) {
      return gbabiesWrite;
    }
    return write;
  }, [showIsApprovedForAll, gbabiesWrite, write]);

  return (
    <BurnTab
      buttonLabel={buttonLabel}
      write={buttonAction}
      ids={gBabyTokens}
      selected={selectedIds}
      totalWits={gbabiesReturnValue}
      handleSelected={handleSelected}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      balance={balance}
      count={quillAndInkBurnReturnValue}
      price={utils.formatUnits(price, 18)}
      total={quillAndInkBurnReturnValue + gbabiesReturnValue}
    />
  );
}
