import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINT_TOP_DEBTS, API_SEGMENT_RECRUITMENT, API_URL } from './constants.ts';
import type { Debt } from '../types/api';

const fetchTopDebts = async (): Promise<Debt[]> => {
  const response = await fetch(`${API_URL}/${API_SEGMENT_RECRUITMENT}/${API_ENDPOINT_TOP_DEBTS}`);

  return await response.json();
};

export const useFetchTopDebts = () => {
  return useQuery<Debt[]>({
    queryKey: ['fetch-top-debts'],
    queryFn: fetchTopDebts,
  });
};
