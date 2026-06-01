"use client";

import clsx from "clsx";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useBack } from "@/app/hooks/useBack";
import { usePathname } from "next/navigation";
import Profile from "@/components/ui/Profile/Profile";
import { useState } from "react";

interface HeaderProps {
  showActions?: boolean;
}

function Header({ showActions = true }: HeaderProps) {
  const { goBack } = useBack({ fallback: "/" });
  // 추후 zustand로 수정필요
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

        {showActions && (
          <div className={styles["headerActions"]}>
            {isLoggedIn ? (
              <Profile isLoggedIn={isLoggedIn} />
            ) : (
              <Link href="/login" className={styles["loginBtn"]}>
                <span>로그인</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
