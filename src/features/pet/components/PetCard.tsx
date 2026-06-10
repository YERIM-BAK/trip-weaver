"use client";

import ImgPetWalking from "@/assets/images/img/img-pet-walking.png";
import Image from "next/image";

export default function PetCard() {
  return (
    <div className="petCard">
      <div className="petInfo">
        <div className="petImage">
          <Image src="/images/pet.jpg" alt="몽이" fill />
        </div>

        <div className="petContent">
          <div className="petNameRow">
            <strong className="petName">몽이</strong>
          </div>

          <p className="petMeta">말티즈 · 5살 · 남아</p>
        </div>
      </div>
      <div className="btn-group">
        <button type="button" className="">
          대표 설정
        </button>
        <button type="button" className="">
          수정
        </button>
        <button type="button" className="">
          삭제
        </button>
      </div>
    </div>
  );
}
