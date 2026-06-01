"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./TextInput.module.scss";
import { InputProps } from "./TextInput.types";
import clsx from "clsx";
import Image from "next/image";

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      helperText,
      onChange,
      type = "text",
      value,
      className,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [password, setPassword] = useState("");

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const onReset = () => {
      onChange?.({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      inputRef.current?.focus();
    };
    return (
      <div className={clsx(styles["inputField"], "inputField", className)}>
        {label && (
          <label htmlFor={id} className={styles["inputLabel"]}>
            {label}
          </label>
        )}
        <div className={clsx(styles["inputControl"], "inputControl")}>
          {leftIcon && (
            <Image
              src={leftIcon}
              alt=""
              className={styles["leftIcon"]}
              width={16}
              height={16}
            />
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

          {rightIcon && <Image src={rightIcon} alt="" width={16} height={16} />}
        </div>
        {helperText && <p className={styles["helperText"]}>{helperText}</p>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
