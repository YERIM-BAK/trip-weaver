"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import ImgPetDefault from "@/assets/images/img/icon-dog.png";
import defaultAvatar from "@/assets/images/img/img-profile.png";
import PlanCard from "@/features/plan/components/PlanCard/PlanCard";

import jejuImg from "@/assets/images/img/jeju.jpg";
import busanImg from "@/assets/images/img/busan.jpg";

const DEFAULT_AVATAR = defaultAvatar;

function MyPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
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
            <div className="profileImage">
              <Image
                src={profileImage ?? DEFAULT_AVATAR}
                alt="프로필"
                width={96}
                height={96}
                priority
              />
            </div>

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

      <div className="section">
        <div className="titleWrap">
          <h2 className="sectionTitle">함께하는 반려동물</h2>
          <Link href="/my/pets" className="link-btn">
            <span className="link-btn-text">관리</span>
          </Link>
        </div>

        <Link href={`/my/pets`} className="petCard">
          <div className="petInfo">
            <div className="petImage">
              <Image src={ImgPetDefault} alt="몽이" priority />
            </div>

            <div className="petContent">
              {/* {pet.isPrimary && (
                <span className="petBadge">대표</span>
              )} */}
              <span className="petBadge">대표</span>
              <strong className="petName">몽이</strong>

              <button
                type="button"
                className="petEditBtn"
                aria-label="반려동물 프로필 수정"
              ></button>

              <p className="petMeta">말티즈&middot;5살&middot;남아</p>
            </div>
          </div>
        </Link>

        <button type="button" className="addPetBtn">
          <span>반려동물 추가하기</span>
        </button>
      </div>

      <div className="section">
        <div className="titleWrap">
          <h2 className="sectionTitle">내 여행</h2>
          <Link href="/plan" className="link-btn">
            <span className="link-btn-text">전체보기</span>
          </Link>
        </div>

        <div className="planWrap">
          <PlanCard
            id="1"
            title="제주도 반려견 여행"
            startDate="2024.06.01"
            endDate="2024.06.03"
            nights={2}
            status="준비중"
            image={jejuImg.src}
          />
          <PlanCard
            id="2"
            title="부산 바다 여행"
            startDate="2024.07.10"
            endDate="2024.07.12"
            nights={2}
            status="다녀옴"
            image={busanImg.src}
          />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
