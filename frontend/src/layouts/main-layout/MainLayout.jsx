import { Outlet } from 'react-router-dom';

import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function MainLayout() {
  return (
    <div className="main-layout">
      <Header></Header>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
