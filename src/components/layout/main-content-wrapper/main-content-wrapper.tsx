import type { ReactNode } from 'react';

interface MainContentWrapperProps {
  children: ReactNode;
}

export const MainContentWrapper = ({ children }: MainContentWrapperProps) => {
  return <main className="flex flex-1 w-full p-2">{children}</main>;
};
