import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuth2RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return <p className="text-center mt-5">Accediendo a swapIt...</p>;
}

export default OAuth2RedirectHandler;
