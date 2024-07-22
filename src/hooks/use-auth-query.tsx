import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '../types';

export const checkAuth = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me?populate=role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch {
    return null;
  }
};

export const useAuthQuery = () => {
  return useQuery<User | null, Error>({
    queryKey: ['auth'],
    queryFn: checkAuth,
    retry: false,
  });
};