import { StaticImageData } from "next/image";
import { InputHTMLAttributes } from "react";

type InputStatus = "default" | "error" | "success";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  status?: InputStatus;
  leftIcon?: string | StaticImageData;
  rightIcon?: string | StaticImageData;
}
