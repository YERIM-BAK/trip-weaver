"use client";

import { Bookmark, Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import PetCard from "@/features/pet/components/PetCard";

function MyPage() {
  const [profileImage, setProfileImage] = useState(
    "/images/avatar-default5.png",
  );

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setProfileImage(preview);
  };

  return (
    <div className="myPage">
      <div className="profileCard">
        <div className="profileHeader">
          <div className="profileImageWrap">
            <Image
              src={profileImage}
              alt="프로필"
              className="profileImage"
              fill
              sizes="96px"
              priority
            />

            <label htmlFor="profileImage" className="profileImageEdit">
              <Camera size={16} />
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="profileImageInput"
              onChange={handleProfileImage}
            />
          </div>
          <div className="profileInfo">
            <strong className="profileName">박예림</strong>

            <p className="profileDescription">
              반려동물과 함께
              <br />
              특별한 여행을 기록하는 중
            </p>
          </div>
        </div>
        <ul className="profileStats">
          <li>
            <span className="statItem">
              <span className="statCount">12</span>
              <span className="statTitle">여행</span>
            </span>
          </li>
          <li>
            <span className="statItem">
              <span className="statCount">53</span>
              <span className="statTitle">방문장소</span>
            </span>
          </li>
          <li>
            <span className="statItem">
              <span className="statCount">12</span>
              <span className="statTitle">북마크</span>
            </span>
          </li>
        </ul>
      </div>

      <div className="petSection">
        <div className="titleWrap">
          <h2 className="sectionTitle">함께하는 반려동물</h2>
          <Link href="/my/pets" className="link-btn">
            <span className="link-btn-text">관리</span>
          </Link>
        </div>

        <PetCard />

        <button type="button" className="addPetBtn">
          <span className="addPetIcon">+</span>
          <span>반려동물 추가하기</span>
        </button>
      </div>

      <div>
        <div className="titleWrap">
          <h2 className="sectionTitle">내 여행</h2>
          <Link href="/my/pets" className="link-btn">
            <span className="link-btn-text">전체보기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
