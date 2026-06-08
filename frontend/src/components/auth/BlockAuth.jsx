import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

const BlockAuth = () => {
  const { auth } = useAuth();

  return auth?.usuario ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};

export default BlockAuth;
