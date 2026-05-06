import { SearchResultsProps } from "../search.types";
import styles from "./Search.module.scss";

export default function SearchResults({ results, isSearching, onSelect, }: SearchResultsProps) {
  if (isSearching) return <div>검색중...</div>;
  return (
    <div className={styles["searchResults"]}>
      <ul className={styles["searchResultList"]}>
        {results.map((item) => (
          <li key={item.id} className={styles["searchResultItem"]} >
            <button type="button" onClick={() => onSelect(item)}>
              <span className={styles["placeName"]}>{item.place_name}</span>
              <span className={styles["placeAddress"]}>
                {item.road_address_name || item.address_name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
