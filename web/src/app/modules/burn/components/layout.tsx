import { Svg } from '../../core/components/svgs';

interface LayoutProps {
  header: string;
  subheader: string;
  footer: React.ReactNode;
  children?: React.ReactNode;
}

export function Layout({ children, header, subheader, footer }: LayoutProps) {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center w-full">
      <div className="font-dragon text-xl">{header}</div>
      <Svg name="diamond" />
      <div className="font-dragon text-md">{subheader}</div>

      {children}

      <div className="font-dragon text-md">{footer}</div>
    </div>
  );
}
