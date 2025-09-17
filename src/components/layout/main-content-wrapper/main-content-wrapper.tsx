import type { ReactNode } from 'react';
import { useFetchTopDebts } from '../../../api/fetch-top-debts.api.ts';

interface MainContentWrapperProps {
  children: ReactNode;
}

export const MainContentWrapper = ({ children }: MainContentWrapperProps) => {
  const { data, isLoading, isError, failureReason } = useFetchTopDebts();

  if (isLoading) return <>Loading...</>;

  if (isError) {
    return (
      <>
        <p>Something went wrong. Please try again.</p>
      </>
    );
  }

  console.log(data, isLoading, isError, failureReason);
  return <main className="flex flex-1 p-2">{children}</main>;
};
