"use client";

import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import { DropdownProps } from "./dropdown.types";

function Dropdown({
  options,
  value,
  onChange,
  placeholder = "선택",
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        styles["dropdown"],
        "dropdown",
        isOpen && styles["is-open"],
        className,
      )}
    >
      <button
        type="button"
        className={clsx(styles["trigger"], "dropdown-trigger")}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles["triggerText"]}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={clsx(styles["arrow"], isOpen && styles["is-open"])}>
          ▾
        </span>
      </button>

      {isOpen && (
        <ul className={clsx(styles["menu"], "dropdown-menu")}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={clsx(
                  styles["menuItem"],
                  "dropdown-item",
                  option.value === value && styles["is-active"],
                )}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
