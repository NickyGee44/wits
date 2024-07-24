import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';

interface ButtonProps {
  disabled?: boolean;
  children?: React.ReactNode;
  handleClick?: () => void;
}

export const SubmitButton = ({
  children,
  disabled,
  handleClick,
}: ButtonProps) => (
  <button
    disabled={disabled}
    className={classNames(
      'relative group',
      'disabled:cursor-not-allowed disabled:opacity-50'
    )}
    onClick={() => {
      if (disabled) return;
      handleClick && handleClick();
    }}
  >
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gold group-hover:text-black group-active:text-black font-beaufort">
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
    <div className="font-beaufort">{children}</div>
  </button>
);

export const ConnectButton = () => (
  <RainbowConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      authenticationStatus,
      mounted,
    }) => {
      // Note: If your app doesn't use authentication, you
      // can remove all 'authenticationStatus' checks
      const ready = mounted && authenticationStatus !== 'loading';
      const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus || authenticationStatus === 'authenticated');

      return (
        <div
          {...(!ready && {
            'aria-hidden': true,
            style: {
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            },
          })}
        >
          {(() => {
            if (!connected) {
              return (
                <PrimaryButton handleClick={openConnectModal}>
                  CONNECT WALLET
                </PrimaryButton>
              );
            }

            if (chain.unsupported) {
              return (
                <PrimaryButton handleClick={openChainModal}>
                  Wrong network
                </PrimaryButton>
              );
            }

            return (
              <div style={{ display: 'flex', gap: 12 }}>
                <PrimaryButton handleClick={openChainModal}>
                  <div className="flex flex-row nowrap justify-center items-center">
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </div>
                </PrimaryButton>

                <PrimaryButton handleClick={openAccountModal}>
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ''}
                </PrimaryButton>
              </div>
            );
          })()}
        </div>
      );
    }}
  </RainbowConnectButton.Custom>
);
