import useDocumentTitle from '@/hooks/useDocumentTitle';

function Error404() {
  useDocumentTitle('Página no encontrada');

  return (
    <div className="main-layout">
      <h1>Página Error 404</h1>
    </div>
  );
}

export default Error404;
