import { Outlet } from 'react-router-dom';

import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header></Header>
      <main className="main-content flex-grow-1">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
