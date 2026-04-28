import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './forms/login/Login';
import Register from './forms/signup/Register';
import AuthLayout from './layouts/auth-layout/AuthLayout';
import MainLayout from './layouts/main-layout/MainLayout';
import Buscar from './pages/buscar/Buscar';
import Error404 from './pages/error404/Error404';
import Inicio from './pages/inicio/Inicio';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/buscar" element={<Buscar />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>

        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
