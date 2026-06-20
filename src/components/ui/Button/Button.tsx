import { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";
import clsx from "clsx";

function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  type = "button",
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = clsx(
    styles["btn"],
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    fullWidth && styles["btn--full"],
    loading && styles["is-loading"],
    className,
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className={styles["btnSpinner"]} aria-hidden />}
      {!loading && leftIcon && (
        <span className={styles["btnIcon"]}>{leftIcon}</span>
      )}
      <span className={styles["btnText"]}>{children}</span>
      {!loading && rightIcon && (
        <span className={styles["btnIcon"]}>{rightIcon}</span>
      )}
    </button>
  );
}

export default Button;
