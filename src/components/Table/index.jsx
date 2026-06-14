import DataState from '../DataState';
import './style.css';

export default function Table({
  columns = [],
  data = [],
  onRowClick,
  isLoading = false,
  error = '',
  fallback = null,
}) {
  const isClickable = typeof onRowClick === 'function' && data.length > 0;
  const hasRows = !isLoading && !error && data.length > 0;

  return (
    <div className="table-wrapper">
      {hasRows ? (
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.accessor}>{column.Header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                onClick={() => {
                  if (isClickable) {
                    onRowClick(row);
                  }
                }}
                className={isClickable ? 'clickable-row' : ''}
              >
                {columns.map((column) => (
                  <td key={`${row.id || rowIndex}-${column.accessor}`}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {isLoading ? (
        <DataState
          variant="loading"
          title="Loading data..."
          message="Please wait while we prepare the table."
        />
      ) : null}

      {!isLoading && error ? fallback || (
        <DataState
          variant="error"
          title="Data could not be loaded"
          message="Please try again later."
        />
      ) : null}

      {!isLoading && !error && data.length === 0 ? (
        <DataState
          variant="empty"
          title="No data found"
          message="There is nothing to display here yet."
        />
      ) : null}
    </div>
  );
}
