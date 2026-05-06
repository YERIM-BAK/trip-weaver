
"use client";

import { notFound } from 'next/navigation';

import TextInput from "./ui/TextInput";

//import { SearchBoxProps } from "../search.types";
export type SearchBoxProps = {};
//import styles from "./Search.module.scss";
import styles from "@/features/search/components/Search.module.scss"


export default function TestPage({}: SearchBoxProps) {

  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!isDevelopment) {
    notFound();
  }

  return (
    <div className={styles["searchBox"]}>
      <TextInput type="search" placeholder="검색어를 입력하세요." />
      <button className={styles["searchBtn"]} aria-label="검색하기"></button>
    </div>
  );
}

