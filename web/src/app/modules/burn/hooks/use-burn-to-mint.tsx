import { useBalanceOf } from '../../core/hooks/use-balance-of';
import {
  useTokensOfOwner,
  useTokensOfOwnerUsingIndex,
} from '../../core/hooks/use-tokens-of-owner';

export function useBurnToMint(
  gBabiesContractAddress: `0x${string}`,
  quillAndInkContractAddress: `0x${string}`,
  account: `0x${string}`
) {
  const gBabiesBalance = useBalanceOf(gBabiesContractAddress, account);
  const quillAndInkBalance = useBalanceOf(quillAndInkContractAddress, account);
  const gBabyTokens = useTokensOfOwnerUsingIndex(
    gBabiesContractAddress,
    account,
    gBabiesBalance
  );

  const quillAndInkTokens = useTokensOfOwner(
    quillAndInkContractAddress,
    account
  );

  return {
    gBabiesBalance,
    quillAndInkBalance,
    gBabyTokens,
    quillAndInkTokens,
  };
}
