import React from "react";
import "./Table.css";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type TablePropsGeneric<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
};

type TablePropsSimple = {
  columns: string[];
  rows: any[][];
  isLoading?: boolean;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
};

type TableProps<T> = TablePropsGeneric<T> | TablePropsSimple;

export function Table<T>(props: TableProps<T>) {
  const isSimple = "rows" in props;

  if (isSimple) {
    const { columns, rows, isLoading } = props as TablePropsSimple;

    return (
      <section className="table table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length}>Carregando...</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>Nenhum dado encontrado.</td>
              </tr>
            ) : (
              rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Simples: paginação somente se fornecida */}
        {props.page &&
        props.pageSize &&
        props.totalItems &&
        props.onPageChange ? (
          <Pagination
            page={props.page}
            pageSize={props.pageSize}
            totalItems={props.totalItems}
            onPageChange={props.onPageChange}
          />
        ) : null}
      </section>
    );
  } else {
    // genérico
    const {
      columns,
      data,
      isLoading = false,
      page = 1,
      pageSize = data.length || 10,
      totalItems = data.length,
      onPageChange,
    } = props as TablePropsGeneric<T>;

    return (
      <section className="table table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={String(col.key) + idx}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length}>Carregando...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>Nenhum dado encontrado.</td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i}>
                  {columns.map((col, ci) => (
                    <td key={String(col.key) + ci}>
                      {col.render
                        ? col.render(row)
                        : (row as any)[col.key as keyof T]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINAÇÃO */}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      </section>
    );
  }
}

// componente de paginação interno simples
function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange?: (p: number) => void;
}) {
  if (!onPageChange) return null;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  return (
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
  );
}
