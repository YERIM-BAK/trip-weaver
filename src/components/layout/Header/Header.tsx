"use client";

import clsx from "clsx";
import styles from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBack } from "@/app/hooks/useBack";

// type HeaderProps = {};

const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/plan", label: "코스" },
  { href: "/bookmark", label: "북마크" },
  { href: "/my", label: "내 정보" },
];

function Header() {
  const pathname = usePathname();
  const { goBack } = useBack({ fallback: "/" });
  return (
    <header className={clsx(styles["headerRoot"])}>
      <div className={styles["headerInner"]}>
        <button
          className={styles["back-btn"]}
          onClick={goBack}
          aria-label="뒤로가기"
        ></button>
        <Link
          href="/"
          className={styles["logo"]}
          aria-label="TripWeaver 홈으로 이동"
        >
          <span className={styles["logoText"]}>TripWeaver</span>
        </Link>

        {/* <nav className={styles["nav"]}>
          <ul className={styles["navList"]}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles["navLink"]}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav> */}
      </div>
    </header>
  );
}

export default Header;
