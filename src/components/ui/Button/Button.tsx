import { ButtonProps } from "react-day-picker";

function Button({ children }: ButtonProps) {
  return <button type="button">{children}</button>;
}

export default Button;
