// src/hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import axios from '../lib/axios';

export const useAuth = () => {
  const signup = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post('/auth/signup', data);
      localStorage.setItem('token', res.data.token); 
      return res.data;
    },
  });

  return { signup };
};
