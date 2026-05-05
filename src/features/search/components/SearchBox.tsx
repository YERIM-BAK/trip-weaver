import TextInput from "@/components/ui/TextInput/TextInput";
import { SearchBoxProps } from "../search.types";
import styles from "./Search.module.scss";

export default function SearchBox({}: SearchBoxProps) {
  return (
    <div className={styles["searchBox"]}>
      <TextInput placeholder="검색어를 입력하세요." />
      <button className={styles["searchBtn"]} aria-label="검색하기"></button>
    </div>
  );
}
