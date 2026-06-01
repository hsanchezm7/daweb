import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { instancePrivate } from '@/services/apiFacade';

import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const useApiPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const refreshRef = useRef(refresh);
  const authRef = useRef(auth);

  useEffect(() => {
    refreshRef.current = refresh;
  }, [refresh]);
  useEffect(() => {
    authRef.current = auth;
  }, [auth]);

  useEffect(() => {
    let refreshPromise = null;

    const requestId = instancePrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] =
            `Bearer ${authRef.current?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseId = instancePrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true; // un único intento

          try {
            if (!refreshPromise) {
              refreshPromise = refreshRef.current().finally(() => {
                refreshPromise = null;
              });
            }

            const newAccessToken = await refreshPromise;
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return instancePrivate(prevRequest);
          } catch {
            // limpiar auth y redirigir a /login
            setAuth({});
            navigate('/login', { replace: true });
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      instancePrivate.interceptors.request.eject(requestId);
      instancePrivate.interceptors.response.eject(responseId);
    };
  }, [navigate, setAuth]);

  return instancePrivate;
};

export default useApiPrivate;
