import { BRDateTimePicker } from "@govbr-ds/core";
import { useEffect, useRef } from "react";

interface DateTimeProps {
  label?: string,
  dataMode?: "single" | "range"
  dataType?: "text" | "time" | "datetime-local",
  value?: any,
  minDate?: any,
  maxDate?: any,
  placeholder?: string,
  onChange?: (data: any) => void,
  status?: "success" | "danger" | "info" | "warning",
  feedback?: string
}

export const DateTime: React.FC<DateTimeProps> = ({ label, dataMode = "single", dataType = "text", value, minDate, maxDate, placeholder, onChange, status, feedback }) => {
  const objectRef = useRef<typeof BRDateTimePicker>();
  const divRef = useRef<HTMLDivElement>(null);

  const inputId = window.crypto.randomUUID();
  const buttonId = window.crypto.randomUUID();
  const feedbackId = window.crypto.randomUUID();

  const fromIso = (input: string) => {
    switch (dataType) {
      case "text":
        return input.split("-").reverse().join("/");
      case "time":
        return input.substring(0, 5);
      case "datetime-local":
        return input.split("T")[0].split("-").reverse().join("/") + " " + input.split("T")[1].substring(0, 5);
    }
  }

  let config: any = {}

  if (minDate) config.minDate = fromIso(minDate);
  if (maxDate) config.maxDate = fromIso(maxDate);

  useEffect(() => {
    if (divRef.current && !objectRef.current) {
      objectRef.current = new BRDateTimePicker(".br-datetimepicker", divRef.current, config);
    }
  }, []);

  const toIso = (input: string) => {
    switch (dataType) {
      case "text":
        return input.split("/").reverse().join("-");
      case "time":
        return input + ":00";
      case "datetime-local":
        return input.split(" ")[0].split("/").reverse().join("-") + "T" + input.split(" ")[1] + ":00";
    }
  }

  const getOnChange = (data) => {
    onChange?.(toIso(data.currentTarget.value));
  }

  return (
    <div className="br-datetimepicker" data-mode={dataMode} data-type={dataType} ref={divRef}>
      <div className="br-input has-icon">
        <label htmlFor={inputId}>{label}</label>
        <input id={inputId} type={dataType} aria-describedby={feedbackId} placeholder={placeholder} data-input="data-input" defaultValue={value ? fromIso(value) : undefined} onInput={(e) => getOnChange(e)} />
        <button id={buttonId} className="br-button circle small" type="button" aria-label="Abrir" data-toggle="data-toggle" tabIndex={-1} aria-hidden="true">
          <i className="fas fa-calendar-alt" aria-hidden="true"></i>
        </button>
      </div>
      {feedback &&
        <span className={"feedback " + status} role="alert" id={feedbackId}>
          <i className="fas fa-times-circle" aria-hidden="true"></i>
          {feedback}
        </span>
      }
    </div>
  );
}