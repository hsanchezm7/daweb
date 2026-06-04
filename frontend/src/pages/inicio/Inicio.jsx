import useDocumentTitle from '@/hooks/useDocumentTitle';

function Inicio() {
  useDocumentTitle();

  return (
    <div className="pagina-inicio">
      <h1>Inicio</h1>
    </div>
  );
}

export default Inicio;
