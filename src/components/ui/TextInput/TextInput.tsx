"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./TextInput.module.scss";
import { InputProps } from "./TextInput.types";
import clsx from "clsx";
import Image from "next/image";
import IconEyeOn from "../../../assets/images/icons/icon-eye-on.svg";
import IconEyeOff from "../../../assets/images/icons/icon-eye-off.svg";

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
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const onReset = () => {
      onChange?.({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      inputRef.current?.focus();
    };

    const clearButton = value && (
      <button
        type="button"
        className={clsx(styles["inputClearBtn"], "inputClearBtn")}
        aria-label="내용 삭제"
        onClick={onReset}
      />
    );

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
            type={isPassword && showPassword ? "text" : type}
            onChange={onChange}
            value={value ?? ""}
            className={clsx(styles["input"], "input")}
            {...props}
          />

          {value && isPassword ? (
            <>
              {clearButton}
              <button
                type="button"
                className={clsx(styles["inputToggleBtn"], "inputToggleBtn")}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Image
                  src={showPassword ? IconEyeOff : IconEyeOn}
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
            </>
          ) : (
            <>
              {clearButton}
              {rightIcon && (
                <Image src={rightIcon} alt="" width={16} height={16} />
              )}
            </>
          )}
        </div>
        {helperText && <p className={styles["helperText"]}>{helperText}</p>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
