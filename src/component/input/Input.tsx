import { BRInput } from "@govbr-ds/core";
import { useEffect, useRef } from "react";

interface InputProps {
  label?: string,
  type?: string,
  value?: any,
  placeholder?: string,
  onChange?: (data: any) => void,
  status?: "success" | "danger" | "info" | "warning",
  feedback?: string,
  button?: boolean,
  icon?: string,
  onClick?: (data: any) => void
}

export const Input: React.FC<InputProps> = ({ label, type = "text", value, placeholder = "", onChange, status, feedback, button = false, icon = "search", onClick }) => {
  const objectRef = useRef<typeof BRInput>();
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef(null);

  const id = window.crypto.randomUUID();

  useEffect(() => {
    if (divRef.current && !objectRef.current) {
      objectRef.current = new BRInput(".br-input", divRef.current);
    }
  }, []);

  const getOnChange = (data) => {
    onChange?.(data.currentTarget.value);
  }

  const getOnClick = (data: string) => {
    onClick?.(data);
  }

  return (
    <div className={"br-input " + status + (button ? " input-button" : "")} ref={divRef}>
      {label &&
        <label htmlFor={"id-" + id}>{label}</label>
      }
      <input id={id} type={type} aria-describedby={"fb-" + id} defaultValue={value ? value : undefined} placeholder={placeholder} ref={inputRef} onChange={(e) => getOnChange(e)} />
      {button &&
        <button className="br-button" type="button" onClick={() => getOnClick(inputRef.current.value)}>
          <i className={"fas fa-" + icon} aria-hidden="true"></i>
        </button>
      }
      {feedback &&
        <span className={"feedback " + status} role="alert" id={"fb-" + id}>
          <i className="fas fa-times-circle" aria-hidden="true"></i>
          {feedback}
        </span>
      }
    </div>
  );
}