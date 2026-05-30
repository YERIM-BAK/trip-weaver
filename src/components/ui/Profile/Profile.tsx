import clsx from "clsx";
import Link from "next/link";
import styles from "./Profile.module.scss";
import Image from "next/image";
import { ProfileProps } from "./Profile.types";

export default function Profile({ avatarUrl }: ProfileProps) {
  return (
    <Link
      href="/my"
      className={clsx(styles["avatar"], "avatar")}
      aria-label="내 정보"
    >
      <Image
        src={avatarUrl || "/images/avatar-default5.png"}
        alt="프로필"
        width={34}
        height={34}
        className={styles["avatarImg"]}
      />
    </Link>
  );
}
