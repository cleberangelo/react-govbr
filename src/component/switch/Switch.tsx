interface SwitchProps {
  style?: any,
  label?: string,
  disabled?: boolean,
  checked?: boolean,
  onChange?: (data: any) => void,
}

export const Switch: React.FC<SwitchProps> = ({ style, label = "", disabled = false, checked = false, onChange }) => {
  const id = window.crypto.randomUUID();

  const getOnChange = (event) => {
    onChange?.(event.target.checked);
  }

  return (
    <div className={"br-switch " + (style ? " " + style : "")}>
      <input id={id} type="checkbox" disabled={disabled} defaultChecked={checked} onChange={getOnChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}