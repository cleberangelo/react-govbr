import { BRSelect } from "@govbr-ds/core";
import { useEffect, useRef } from "react";

export interface SelectOptions {
  value: any,
  label: string,
}

interface SelectProps {
  label?: string,
  placeholder?: string,
  multiple?: boolean,
  options: SelectOptions[],
  value?: any | any[],
  onChange?: (data: number | []) => void,
}

export const Select: React.FC<SelectProps> = ({ label, placeholder = "Selecione...", multiple = false, options, value, onChange }) => {
  const objectRef = useRef<typeof BRSelect>();
  const divRef = useRef<HTMLDivElement>(null);

  const id = window.crypto.randomUUID();

  useEffect(() => {
    if (divRef.current && !objectRef.current) {
      objectRef.current = new BRSelect(".br-select", divRef.current);
    }

    if (multiple) {
      objectRef.current.multiple = true;
      objectRef.current.resetOptionsList();
    }
  }, []);

  const getSelected = () => {
    onChange?.(objectRef.current.selectedValue);
  }

  const setSelected = (opt) => {
    if (multiple) {
      return value.some(e => String(e) === String(opt));
    } else {
      return String(value) === String(opt);
    }
  }

  return (
    <div id={id} className="br-select" ref={divRef}>
      <div className="br-input">
        <label htmlFor="select-filter">{label}</label>
        <input id={"select-filter-" + id} type="text" placeholder={placeholder} />
        <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger">
          <i className="fas fa-angle-down" aria-hidden="true"></i>
        </button>
      </div>
      <div className="br-list" tabIndex={0}>
        {multiple &&
          <div className="br-item highlighted" data-all="data-all" tabIndex={-1}>
            <div className="br-checkbox">
              <input id={"cb-" + id} name={"cb-" + id} type="checkbox" />
              <label htmlFor={"cb-" + id}>Selecionar todos</label>
            </div>
          </div>
        }
        {options.map((o, i) => {
          return (
            <div className={"br-item" + (setSelected(o.value) ? " selected" : "")} data-toggle="selection" tabIndex={-1} key={i}>
              <div className={multiple ? "br-checkbox" : "br-radio"}>
                <input id={"cbs-" + id + "-" + i} name={"cbs-" + id + "-" + i} type={multiple ? "checkbox" : "radio"} defaultValue={o.value} onClick={() => getSelected()} />
                <label htmlFor={"cbs-" + id + "-" + i}>{o.label}</label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}