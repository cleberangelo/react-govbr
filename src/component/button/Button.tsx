interface ButtonProps {
  style?: any, /* "primary" | "secondary" & "dark" | "circle" */
  text?: string,
  icon?: string,
  type?: "button" | "submit" | "reset",
  disabled?: boolean,
  onClick?: (data: any) => void
}

export const Button: React.FC<ButtonProps> = ({ style, text = "", icon, type = "button", disabled = false, onClick }) => {
  const id = window.crypto.randomUUID();

  const getOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick?.(event);
  }

  return (
    <button id={id} className={"br-button" + (style ? " " + style : "")} type={type} disabled={disabled} onClick={getOnClick}>
      {icon &&
        <i className={"fas fa-" + icon + " mr-1"}></i>
      }
      {text}
    </button>
  );
}