import { environment } from '../../../../environments/environment';

interface TransactionLinkProps {
  tx: string;
  message?: string;
}

function buildExplorerLink(tx: string, chain: string) {
  if (chain === 'mainnet') {
    return `https://etherscan.io/tx/${tx}`;
  }
  if (chain === 'goerli') {
    return `https://goerli.etherscan.io/tx/${tx}`;
  }
  if (chain === 'polygon') {
    return `https://mumbai.polygonscan.com/tx/${tx}`;
  }

  return '';
}

export const TransactionLink = ({ tx, message }: TransactionLinkProps) => (
  <a
    href={buildExplorerLink(tx, environment.chain)}
    target="_blank"
    rel="noreferrer"
  >
    {message || 'Transaction Sent! Click Here to View Transaction'}
  </a>
);
