import { Pagination } from 'react-bootstrap';

import './Paginator.css'

function Paginator({ pageInfo, onPageChange }) {
  if (!pageInfo || pageInfo.totalPages <= 1) return null;

  return (
    <Pagination className="compraventas-pagination mt-4">
      <Pagination.First
        disabled={pageInfo.number === 0}
        onClick={() => onPageChange(0)}
      />
      <Pagination.Prev
        disabled={pageInfo.number === 0}
        onClick={() => onPageChange(pageInfo.number - 1)}
      />
      {pageInfo.number > 2 && (
        <Pagination.Item onClick={() => onPageChange(0)}>
          {1}
        </Pagination.Item>
      )}

      {pageInfo.number > 3 && <Pagination.Ellipsis />}

      {/* actual - 2 */}
      {pageInfo.number > 1 && (
        <Pagination.Item onClick={() => onPageChange(pageInfo.number - 2)}>
          {pageInfo.number - 1}
        </Pagination.Item>
      )}

      {/* actual - 1 */}
      {pageInfo.number > 0 && (
        <Pagination.Item onClick={() => onPageChange(pageInfo.number - 1)}>
          {pageInfo.number}
        </Pagination.Item>
      )}

      {/* actual */}
      <Pagination.Item active>{pageInfo.number + 1}</Pagination.Item>

      {/* actual + 1 */}
      {pageInfo.totalPages - pageInfo.number > 1 && (
        <Pagination.Item onClick={() => onPageChange(pageInfo.number + 1)}>
          {pageInfo.number + 2}
        </Pagination.Item>
      )}

      {/* actual + 2 */}
      {pageInfo.totalPages - pageInfo.number > 2 && (
        <Pagination.Item onClick={() => onPageChange(pageInfo.number + 2)}>
          {pageInfo.number + 3}
        </Pagination.Item>
      )}

      {pageInfo.totalPages - pageInfo.number > 4 && <Pagination.Ellipsis />}

      {pageInfo.totalPages - pageInfo.number > 3 && (
        <Pagination.Item onClick={() => onPageChange(pageInfo.totalPages - 1)}>
          {pageInfo.totalPages}
        </Pagination.Item>
      )}

      <Pagination.Next
        disabled={pageInfo.number + 1 === pageInfo.totalPages}
        onClick={() => onPageChange(pageInfo.number + 1)}
      />
      <Pagination.Last
        disabled={pageInfo.number + 1 === pageInfo.totalPages}
        onClick={() => onPageChange(pageInfo.totalPages - 1)}
      />
    </Pagination>
  );
}

export default Paginator;
