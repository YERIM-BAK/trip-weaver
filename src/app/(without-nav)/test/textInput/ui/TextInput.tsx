"use client";

import { forwardRef, useState } from "react";
import styles from "./TextInput.module.scss";
import { InputProps } from "./TextInput.types";
import clsx from "clsx";

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, type = "text", helperText, className, ...props }, ref) => {
    const [text, setText] = useState("");
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    };
    const onReset = () => {
      setText("");
    };
    return (
      <div className={clsx(styles["inputField"], "inputField", className)}>
        <div className={clsx(styles["inputControl"], "inputControl")}>
          {label && (
            <label htmlFor={id} className={styles["inputLabel"]}>
              {label}
            </label>
          )}
          <input
            id={id}
            ref={ref}
            type={type}
            onChange={handleInputChange}
            value={text}
            className={clsx(styles["input"], "input")}
            {...props}
          />

          {text && (
            <button
              type="button"
              className={clsx(styles["inputClearBtn"], "inputClearBtn")}
              aria-label="내용 삭제"
              onClick={onReset}
            ></button>
          )}
        </div>
        {helperText && <p className={styles["helperText"]}>메세지</p>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
