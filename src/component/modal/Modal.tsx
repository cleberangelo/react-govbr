import { useEffect, useMemo, useRef, useState } from "react";

interface ModalProps {
  isOpen?: boolean,
  title?: string,
  children?: React.ReactNode,
  onClick?: (data: any) => void
}

export const Modal: React.FC<ModalProps> = ({ isOpen = false, title = "", children, onClick }) => {
  const id = window.crypto.randomUUID();

  const open = useMemo<boolean>(() => isOpen, [isOpen]);

  return (
    <div className={"br-scrim-util foco" + (open ? " active" : "")} id={"scrim-" + id} data-scrim={open ? "true" : "false"} onClick={() => onClick?.(false)}>
      <div className="br-modal" aria-labelledby={"title-" + id}>
        <div className="br-modal-header" id={"title-" + id}>{title}</div>
        <div className="br-modal-body">
          {children}
        </div>
        <div className="br-modal-footer justify-content-center">
          <button className="br-button secondary" type="button" data-dismiss="true" onClick={() => onClick?.(false)}>Fechar</button>
          <button className="br-button primary mt-3 mt-sm-0 ml-sm-3" type="button">Retornar</button>
        </div>
      </div>
    </div>
  );
}