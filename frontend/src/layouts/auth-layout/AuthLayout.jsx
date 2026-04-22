import { Outlet } from 'react-router-dom';

import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
  faBoxOpen,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AuthLayout.css';

function AuthLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <header className="pt-lg-6 p-lg-5 p-3 text-start text-md-center bg-white shadow-sm no-shadow-lg">
        <h3 className="mb-0">Brand</h3>
      </header>

      <main className="container d-flex flex-grow-1 align-items-center justify-content-center">
        <div className="row w-100">
          {/* columna izquierda. común para inicio de sesión y registro invisible para móviles/tablets. */}
          <div className="col col-lg-6 d-none d-lg-flex flex-column border-end border-2 justify-content-center gap-6 p-5">
            <div className="d-flex align-items-center">
              <div className="me-4">
                <FontAwesomeIcon icon={faHandshake} size="4x" />
              </div>
              <div>
                <h4 className="mb-2">Compra y vende desde casa</h4>
                <p className="text-muted m-0">
                  Empieza a vender tus productos sin necesidad de quedar con
                  nadie.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="me-4">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="4x" />
              </div>
              <div>
                <h4 className="mb-2">Encuentra lo que buscas</h4>
                <p className="text-muted m-0">
                  Busca entre miles de productos filtrando por categorías.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="me-4">
                <FontAwesomeIcon icon={faBoxOpen} size="4x" />
              </div>
              <div>
                <h4 className="mb-2">Gestiona tus pedidos</h4>
                <p className="text-muted m-0">
                  Consulta tu historial de compras.
                </p>
              </div>
            </div>
          </div>

          {/* columna derecha. Outlet será el formulario de login/registro */}
          <div className="col-12 col-lg-6 d-flex flex-column align-items-center p-lg-5">
            <div className="w-100 mx-auto" style={{ maxWidth: '400px' }}>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
