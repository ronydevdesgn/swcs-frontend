import React from 'react';
import './Table.css';
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  ChevronRight,
} from 'react-feather';
import { LoadingSkeleton, EmptyState } from '../Shared/States';

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
  emptyMessage?: string;
};

type TablePropsSimple = {
  columns: string[];
  rows: unknown[][];
  isLoading?: boolean;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
};

type TableProps<T> = TablePropsGeneric<T> | TablePropsSimple;


export function Table<T>(props: TableProps<T>) {
  const isSimple = 'rows' in props;

  const renderCell = (cell: unknown): React.ReactNode => {
    if (cell === null || cell === undefined) return null;
    // se já for um elemento react
    if (React.isValidElement(cell)) return cell as React.ReactNode;
    return String(cell);
  };

  if (isSimple) {
    const { columns, rows, isLoading, emptyMessage = 'Nenhum dado encontrado' } = props as TablePropsSimple;

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
                <td colSpan={columns.length}>
                  <LoadingSkeleton />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState message={emptyMessage} />
                </td>
              </tr>
            ) : (
              rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{renderCell(cell)}</td>
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
      emptyMessage = 'Nenhum dado encontrado',
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
                <td colSpan={columns.length}>
                  <LoadingSkeleton />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState message={emptyMessage} />
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i}>
                  {columns.map((col, ci) => (
                    <td key={String(col.key) + ci}>
                      {col.render
                        ? col.render(row)
                        : renderCell(
                            (row as unknown as Record<string, unknown>)[
                              String(col.key)
                            ],
                          )}
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
      <div className="info"></div>
      <span>
        Página {page} de {totalPages}
      </span>
      <button onClick={() => onPageChange(1)} disabled={page === 1}>
        {<ChevronsLeft size={14} />}
      </button>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        {<ChevronLeft size={14} />}
      </button>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {<ChevronRight size={14} />}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        {<ChevronsRight size={14} />}
      </button>
    </div>
  );
}
