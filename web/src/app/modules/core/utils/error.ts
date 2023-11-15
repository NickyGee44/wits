import { BaseError } from 'viem';

export function formatError(error: any) {
  if (!error) return '';
  return (error as BaseError).walk().message.split(':')[1].split('Version')[0];
}
