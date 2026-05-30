"use client";

import clsx from "clsx";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useBack } from "@/app/hooks/useBack";
import { usePathname } from "next/navigation";
import Profile from "@/components/ui/Profile/Profile";
import { useState } from "react";

function Header() {
  const { goBack } = useBack({ fallback: "/" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className={clsx(styles["headerRoot"])}>
      <div className={styles["headerInner"]}>
        {!isHome && (
          <button
            className={styles["back-btn"]}
            onClick={goBack}
            aria-label="뒤로가기"
          />
        )}

        <Link
          href="/"
          className={styles["logo"]}
          aria-label="TripWeaver 홈으로 이동"
        >
          <span className={styles["logoText"]}>TripWeaver</span>
        </Link>

        <div className={styles["headerActions"]}>
          {isLoggedIn ? (
            <Profile isLoggedIn={isLoggedIn} />
          ) : (
            <button type="button" className={styles["loginBtn"]}>
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
