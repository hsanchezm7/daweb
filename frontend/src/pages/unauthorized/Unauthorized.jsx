import useDocumentTitle from '@/hooks/useDocumentTitle';

import './Unauthorized.css';

function Unauthorized() {
  useDocumentTitle('Sin permisos');

  return <h1>Unauthorized: no tienes permisos</h1>;
}

export default Unauthorized;
