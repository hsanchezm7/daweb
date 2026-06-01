import { useCallback } from 'react';

import authService from '@/services/authService';
import mapAuthResponse from '@/services/mapAuthResponse';

import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = useCallback(async () => {
    const data = await authService.refresh();
    const accessToken = data.accessToken;

    setAuth((prev) => ({ ...prev, ...mapAuthResponse(data) }));
    return accessToken;
  }, [setAuth]);

  return refresh;
};

export default useRefreshToken;
