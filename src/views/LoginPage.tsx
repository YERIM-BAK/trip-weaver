"use client";

import Image from "next/image";
import Link from "next/link";
import TripWeaverLoginImg from "../assets/images/img/tripweaver_login.png";
import TextInput from "@/components/ui/TextInput/TextInput";
import { useState } from "react";
import passwordImg from "../assets/images/icons/icon-password.svg";
import emailImg from "../assets/images/icons/icon-email.svg";
import { useAuthStore } from "@/store/auth.store";

export default function LoginPage() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");

  const { googleLogin, kakaoLogin } = useAuthStore();

  // const handleLogin = async() => {
  //   await Login(credentials)
  // }
  return (
    <div className="loginPage">
      <Link href="/" className="logo" aria-label="TripWeaver 홈으로 이동">
        <h1 className="logoText">TripWeaver</h1>
      </Link>

      <p className="loginTitle">
        반려동물과 떠나는
        <br />
        <span>특별한 여행</span>을 시작해보세요
      </p>

      <div className="ImageWrap">
        <Image
          src={TripWeaverLoginImg}
          alt=""
          fill
          style={{ objectFit: "contain" }}
          priority
          className="loginImage"
        />
      </div>

      <form action="">
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="이메일을 입력해주세요"
          leftIcon={emailImg}
        />
        <TextInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          leftIcon={passwordImg}
        />
        <button type="submit" className="loginBtn">
          로그인
        </button>
      </form>

      <div className="socialBtns">
        <button
          type="button"
          className="kakaoBtn"
          onClick={kakaoLogin}
          aria-label="카카오로 시작하기"
        ></button>
        <button
          type="button"
          className="googleBtn"
          onClick={googleLogin}
          aria-label="Google로 시작하기"
        ></button>
      </div>

      <div className="signupLink">
        <p>아직 계정이 없으신가요?</p>
        <Link href="/signup" className="linkBtn">
          회원가입
        </Link>
      </div>
    </div>
  );
}
