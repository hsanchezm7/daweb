import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import './MainLayout.css';

function MainLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const handleClose = () => setShowMenu(false);
  const handleShow = () => setShowMenu(true);

  // ponemos el location como dependencia para cerrar el offcanvas
  // si cambia la ruta
  useEffect(() => {
    handleClose();
  }, [location.pathname]);

  const isBuscarPage = location.pathname.startsWith('/buscar');

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onMenuToggle={isBuscarPage ? handleShow : undefined}></Header>
      <main className="main-content flex-grow-1">
        <Outlet context={{ showMenu, handleClose }} />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
