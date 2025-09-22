import { useQuery } from '@tanstack/react-query';
import type { Debt, SearchDebtsPayload } from '../types/api';
import { API_ENDPOINT_FILTERED_DEBTS, API_SEGMENT_RECRUITMENT, API_URL } from './constants.ts';

const searchDebts = async ({ phrase }: SearchDebtsPayload): Promise<Debt[]> => {
  const res = await fetch(`${API_URL}/${API_SEGMENT_RECRUITMENT}/${API_ENDPOINT_FILTERED_DEBTS}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phrase }),
  });

  if (!res.ok) {
    throw new Error(`SearchDebts failed: ${res.status} ${res.statusText}`);
  }

  return await res.json();
};

export const useSearchDebts = (phrase: string) =>
  useQuery<Debt[], Error>({
    queryKey: ['search-debts', phrase],
    enabled: phrase.length >= 3,
    queryFn: () => searchDebts({ phrase: phrase }),
  });
