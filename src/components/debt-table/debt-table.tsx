import { useFetchTopDebts } from '../../api';
import { useMemo, useState } from 'react';
import type { DebtDto } from '../../types/api';
import { NO_RESULTS_CONST } from '../../constants';
import { formatDate } from 'date-fns';
import { SortingDebtsOption, SortingDirection } from '../../types/debts';

interface TableHeadersConfig {
  header: string;
  sortingOption: SortingDebtsOption;
}

const TABLE_HEADERS: TableHeadersConfig[] = [
  { header: 'DŁUŻNIK', sortingOption: SortingDebtsOption.NAME },
  { header: 'NIP', sortingOption: SortingDebtsOption.NIP },
  { header: 'KWOTA ZADŁUŻENIA', sortingOption: SortingDebtsOption.VALUE },
  { header: 'DATA POWSTANIA ZOBOWIĄZANIA', sortingOption: SortingDebtsOption.DATE },
];

const DEFAULT_SORTING_OPTION: SortingDebtsOption = SortingDebtsOption.NAME;
const DEFAULT_SORTING_DIRECTION: SortingDirection = SortingDirection.ASC;

export const DebtTable = () => {
  const { data, isLoading, isError } = useFetchTopDebts();

  const [sortDebtsBy, setSortDebtsBy] = useState<SortingDebtsOption>(DEFAULT_SORTING_OPTION);
  const [sortingDirection, setSortingDirection] = useState<SortingDirection>(DEFAULT_SORTING_DIRECTION);

  const sortedDebts = useMemo(() => {
    const dataToSort = data ?? [];
    const multiplier = sortingDirection === SortingDirection.ASC ? 1 : -1;

    dataToSort.sort((a: DebtDto, b: DebtDto) => {
      let result = 0;

      switch (sortDebtsBy) {
        case SortingDebtsOption.NAME:
          result = a.Name.localeCompare(b.Name, 'pl', { sensitivity: 'base' });
          break;
        case SortingDebtsOption.NIP:
          result = a.NIP.localeCompare(b.NIP, 'pl', { numeric: true, sensitivity: 'base' });
          break;
        case SortingDebtsOption.VALUE:
          result = a.Value - b.Value;
          break;
        case SortingDebtsOption.DATE:
          result = new Date(a.Date).getTime() - new Date(b.Date).getTime();
          break;
        default:
          result = 0;
      }

      return result * multiplier;
    });
    return dataToSort;
  }, [data, sortDebtsBy, sortingDirection]);

  if (isLoading) return <>Loading...</>;

  if (isError) return <p>Something went wrong. Please try again.</p>;

  const sortDataHandler = (sortingOption: SortingDebtsOption) => {
    if (sortingOption === sortDebtsBy) {
      setSortingDirection((prev) => (prev === SortingDirection.ASC ? SortingDirection.DESC : SortingDirection.ASC));
    } else {
      setSortDebtsBy(sortingOption);
      setSortingDirection(SortingDirection.ASC);
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto overflow-x-auto pt-4">
      <table className="w-[1280px] border-spacing-2">
        <thead>
          <tr className="border-b">
            {TABLE_HEADERS.map((header, index) => (
              <th key={`header-${index}`} className="text-left py-2 relative">
                <button
                  className="cursor-pointer underline hover:no-underline"
                  onClick={() => sortDataHandler(header.sortingOption)}
                >
                  <span>{header.header}</span>
                </button>
                {sortDebtsBy === header.sortingOption && (
                  <span className="ml-2 absolute right-4">
                    {sortingDirection === SortingDirection.ASC ? <>🔺</> : <>🔻</>}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!sortedDebts || sortedDebts.length === 0 ? (
            <tr className="text-center">
              <td className="py-4" colSpan={4}>
                {NO_RESULTS_CONST}
              </td>
            </tr>
          ) : (
            sortedDebts.map((debt) => (
              <tr key={`debt-${debt.Id}`} className="text-left">
                <td className="py-2">{debt.Name}</td>
                <td className="py-2">{debt.NIP}</td>
                <td className="py-2">{debt.Value}</td>
                <td className="py-2">{formatDate(debt.Date, 'dd-MM-yyyy')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
