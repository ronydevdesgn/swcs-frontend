import React from "react";
import "./Table.css";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export function Table<T>({
  columns,
  data,
  isLoading = false,
  page,
  pageSize,
  totalItems,
  onPageChange,
}: TableProps<T>) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="table table-wrapper">
      {/* <TableHead /> */}
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                Carregando...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                Nenhum registro encontrado
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render
                      ? col.render(row)
                      : (row[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINAÇÃO */}
      <div className="pagination">
        <button onClick={() => onPageChange(1)} disabled={page === 1}>
          {"<<"}
        </button>
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          {"<"}
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          {">"}
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
        >
          {">>"}
        </button>
      </div>
      {/* <TableBody /> */}
    </section>
  );
}
