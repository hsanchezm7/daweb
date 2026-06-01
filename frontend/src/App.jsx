import { Navigate, Route, Routes } from 'react-router-dom';

import PersistLogin from '@/components/auth/PersistLogin';
import RequireAuth from '@/components/auth/RequireAuth';
import { Roles } from '@/config/roles';
import Login from '@/forms/login/Login';
import Register from '@/forms/signup/Register';
import AuthLayout from '@/layouts/auth-layout/AuthLayout';
import MainLayout from '@/layouts/main-layout/MainLayout';
import PanelLayout from '@/layouts/panel-layout/PanelLayout';
import Compraventas from '@/pages/admin/compraventas/Compraventas';
import Usuarios from '@/pages/admin/usuarios/Usuarios';
import Buscar from '@/pages/buscar/Buscar';
import Error404 from '@/pages/error404/Error404';
import Inicio from '@/pages/inicio/Inicio';
import MiCuenta from '@/pages/mi-cuenta/MiCuenta';
import MisProductos from '@/pages/mis-productos/MisProductos';
import Unauthorized from '@/pages/unauthorized/Unauthorized';

import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/buscar" element={<Buscar />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>

      <Route element={<PersistLogin />}>
        <Route
          element={<RequireAuth allowedRoles={[Roles.USUARIO, Roles.ADMIN]} />}
        >
          <Route path="/panel" element={<PanelLayout />}>
            <Route index element={<Navigate to="mi-cuenta" replace />} />
            <Route path="mi-cuenta" element={<MiCuenta />} />
            <Route path="productos" element={<MisProductos />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[Roles.ADMIN]} />}>
          <Route path="/panel" element={<PanelLayout />}>
            <Route path="admin/usuarios" element={<Usuarios />} />
            <Route path="admin/compraventas" element={<Compraventas />} />
          </Route>
        </Route>
      </Route>

      <Route path="/404" element={<Error404 />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
