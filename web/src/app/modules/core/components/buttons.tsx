import classNames from 'classnames';
import truncate from 'truncate-eth-address';

interface ButtonProps {
  disabled?: boolean;
  children?: React.ReactNode;
  handleClick?: () => void;
}

export const SubmitButton = ({
  disabled,
  children,
  handleClick,
}: ButtonProps) => (
  <button
    disabled={disabled}
    className={classNames(
      'relative group',
      disabled && 'disabled:opacity-50 disabled:cursor-not-allowed'
    )}
    onClick={handleClick}
  >
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gold group-hover:text-black group-active:text-black font-dragon">
      {children}
    </div>
    <img
      src="/assets/images/default.png"
      className="w-full group-hover:hidden group-active:hidden"
      alt=""
    />
    <img
      src="/assets/images/hover.png"
      className="w-full hidden group-hover:block group-active:hidden"
      alt=""
    />
    <img
      src="/assets/images/active.png"
      className="w-full hidden group-active:block"
      alt=""
    />
  </button>
);

export const PrimaryButton = ({ children, handleClick }: ButtonProps) => (
  <button
    onClick={handleClick}
    className="px-4 py-2 bg-[#181718]/[0.1] border border-gold-50"
  >
    <div className="font-dragon">{children}</div>
  </button>
);

interface ConnectButtonProps {
  accountLoading: boolean;
  addressLoading: boolean;
  address?: string;
  login: () => void;
  logout: () => void;
  user?: any;
  connect: () => void;
}

export const ConnectButton = ({
  accountLoading,
  addressLoading,
  address,
  login,
  logout,
  user,
  connect,
}: ConnectButtonProps) => {
  if (!user)
    return (
      <PrimaryButton handleClick={login}>
        {accountLoading || addressLoading ? 'Loading...' : 'Login'}
      </PrimaryButton>
    );
  if (!address)
    return (
      <PrimaryButton handleClick={connect}>
        {accountLoading || addressLoading ? 'Loading...' : 'Connect Wallet'}
      </PrimaryButton>
    );
  return (
    <PrimaryButton handleClick={logout}>
      {addressLoading ? 'Loading...' : truncate(address)}
    </PrimaryButton>
  );
};
