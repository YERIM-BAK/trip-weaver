import clsx from "clsx";
import Link from "next/link";
import styles from "./Profile.module.scss";
import Image from "next/image";
import { ProfileProps } from "./Profile.types";

export default function Profile({ profileUrl }: ProfileProps) {
  return (
    <Link
      href="/my"
      className={clsx(styles["profile"], "profile")}
      aria-label="내 정보"
    >
      <Image
        src={profileUrl || "/images/avatar-default5.png"}
        alt="프로필"
        width={34}
        height={34}
        className={styles["profileImg"]}
      />
    </Link>
  );
}
