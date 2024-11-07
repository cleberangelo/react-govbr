import { BRPagination } from "@govbr-ds/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { Select, SelectOptions } from "../select/Select";

interface PaginationProps {
  itemCount: number,
  initPage?: number,
  onChange?: (paging: Paging) => void
}

export interface Paging {
  page: number,
  perPage: number
}

export interface Sorting {
  filter?: string,
  sort: string,
  direction: string
}

export const Pagination: React.FC<PaginationProps> = ({ itemCount, initPage = 1, onChange }) => {
  const objectRef = useRef<typeof BRPagination>();
  const divRef = useRef<HTMLDivElement>(null);

  const id = window.crypto.randomUUID();

  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(initPage);

  const pageCount = useMemo(() => Math.ceil(itemCount / perPage), [perPage, itemCount]);

  const perPageOptions: SelectOptions[] = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  useEffect(() => {
    if (divRef.current && !objectRef.current) {
      objectRef.current = new BRPagination(".br-pagination", divRef.current);
    }
  }, []);

  useEffect(() => setCurrentPage(() => initPage), [initPage]);

  const prevPage = () => {
    setCurrentPage(currentPage => {
      if (currentPage > 1) {
        onChange?.({ page: currentPage - 1, perPage: perPage });
        return currentPage - 1;
      }
    });
  }

  const nextPage = () => {
    setCurrentPage(currentPage => {
      if (pageCount > currentPage) {
        onChange?.({ page: currentPage + 1, perPage: perPage });
        return currentPage + 1;
      }
    });
  }

  const getPerPageData = (data: number) => {
    setCurrentPage(() => 1);
    setPerPage(() => data);
    onChange?.({ page: 1, perPage: data });
  }

  return (
    <nav id={id} className="br-pagination" aria-label="Paginação" data-total={itemCount} data-current={currentPage} data-per-page={perPage} ref={divRef}>
      <div className="pagination-per-page">
        <Select label="Exibir" placeholder="" options={perPageOptions} value={perPage} onChange={getPerPageData} />
      </div>

      <span className="br-divider d-none d-sm-block mx-3"></span>

      <div className="pagination-information d-none d-sm-flex">
        <span className="current">{(currentPage - 1) * perPage + 1}</span>
        &ndash;
        <span className="per-page">{currentPage * perPage > itemCount ? itemCount : currentPage * perPage}</span>
        &nbsp;de&nbsp;
        <span className="total">{itemCount}</span>
        &nbsp;itens
      </div>

      <span className="br-divider d-none d-sm-block mx-3"></span>

      <div className="pagination-arrows ml-auto">
        <button className="br-button circle" type="button" aria-label="Voltar página" disabled={currentPage === 1} onClick={(val) => prevPage()}>
          <i className="fas fa-angle-left" aria-hidden="true"></i>
        </button>
        <button className="br-button circle" type="button" aria-label="Página seguinte" disabled={currentPage === pageCount} onClick={() => nextPage()}>
          <i className="fas fa-angle-right" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  );
}