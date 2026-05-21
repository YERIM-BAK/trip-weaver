"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./TextInput.module.scss";
import { InputProps } from "./TextInput.types";
import clsx from "clsx";

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      type = "text",
      helperText,
      onChange,
      value,
      className,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const onReset = () => {
      onChange?.({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      inputRef.current?.focus();
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
            ref={inputRef}
            type={type}
            onChange={onChange}
            value={value ?? ""}
            className={clsx(styles["input"], "input")}
            {...props}
          />

          {value && (
            <button
              type="button"
              className={clsx(styles["inputClearBtn"], "inputClearBtn")}
              aria-label="내용 삭제"
              onClick={onReset}
            ></button>
          )}
        </div>
        {helperText && <p className={styles["helperText"]}>{helperText}</p>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
