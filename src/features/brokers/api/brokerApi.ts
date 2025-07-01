import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/apiClient';
import type { Broker } from '../types/brokerTypes';



export const useGetBrokerInfo = (id: string) => {
  return useQuery<Broker>({
    queryKey: ['brokers', id],
    queryFn: () => apiClient.get(`/broker/${id}`).then(res => res.data),
    enabled: !!id,
  });
};