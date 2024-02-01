import { BaseError } from 'viem';

export function formatError(error: any) {
  try {
    console.log(error);
    if (!error) return '';
    return (error as BaseError)
      .walk()
      .message.split(':')[1]
      .split('Version')[0];
  } catch (e) {
    return 'Something went wrong';
  }
}
