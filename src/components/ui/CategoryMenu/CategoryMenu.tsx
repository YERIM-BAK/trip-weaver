import CategoryItem from "./CategoryItem";
import { categoryMenu } from "./categoryMenu.data";
import styles from "./CategoryMenu.module.scss";

export default function CategoryMenu() {
  return (
    <ul className={styles["categoryMenu"]}>
      {categoryMenu.map((item) => (
        <li key={item.label}>
          <CategoryItem {...item} />
        </li>
      ))}
    </ul>
  );
}
