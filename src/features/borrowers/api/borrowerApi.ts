import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '../../../services/apiClient';
import type { Borrower, BorrowerPipeline } from '../types/borrowerTypes';

export const useGetBorrowerPipeline = () => {
  return useQuery<BorrowerPipeline>({
    queryKey: ['borrowers', 'pipeline'],
    queryFn: () => apiClient.get('/pipeline').then(res => res.data),
    staleTime: 1000 * 60 * 5, 
  });
};

export const useGetBorrowerDetail = (id: string) => {
  return useQuery<Borrower>({
    queryKey: ['borrowers', id],
    queryFn: () => apiClient.get(`/borrowers/${id}`).then(res => res.data),
    enabled: !!id, 
    retry: false,
  });
};

export const useRequestDocuments = () => {
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.post(`/borrowers/${id}/request-documents`),
  });
};

export const useSendToValuer = () => {
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.post(`/borrowers/${id}/send-valuer`),
  });
};

export const useApproveLoan = () => {
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.post(`/borrowers/${id}/approve`),
  });
};

export const useEscalate = () => {
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.post(`/borrowers/${id}/escalate`),
  });
};