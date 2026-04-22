import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './forms/login/Login';
import AuthLayout from './layouts/auth-layout/AuthLayout';
import MainLayout from './layouts/main-layout/MainLayout';
import Error404 from './pages/error404/Error404';
import Inicio from './pages/inicio/Inicio';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Inicio />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/iniciar-sesion" element={<Login />} />
          {/* <Route path="/crear-cuenta" element={<Registro />} /> */}
        </Route>

        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
