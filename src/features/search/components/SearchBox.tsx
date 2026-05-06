import TextInput from "@/components/ui/TextInput/TextInput";
import { SearchBoxProps } from "../search.types";
import styles from "./Search.module.scss";
import { useRef } from "react";

export default function SearchBox({ placeholder, value, onChange, onSearch, isSearching }: SearchBoxProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles["searchBox"]}>
      <TextInput
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
        placeholder={placeholder}
        ref={searchRef}
      />
      <button
        type="button"
        className={styles["searchBtn"]}
        onClick={onSearch}
        aria-label="검색하기"
        disabled={isSearching}
      />
    </div>
  );
}