import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import useRefreshToken from '@/hooks/useRefreshToken';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch {
      } finally {
        // fallo en refresh
        if (isMounted) setIsLoading(false);
      }
    };

    if (!auth?.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return <p>Cargando...</p>;
  return <Outlet />;
};

export default PersistLogin;
