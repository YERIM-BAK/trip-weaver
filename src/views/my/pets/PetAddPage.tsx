"use client";

import TextInput from "@/components/ui/TextInput/TextInput";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PetAddPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };
  return (
    <section className="petRegister">
      <div className="registerHeader">
        <h2>반려동물 등록</h2>
        <p>함께 여행할 친구 정보를 등록해 주세요</p>
      </div>

      <form className="petForm">
        <div className="imageField">
          <label htmlFor="petImage" className="imageUpload">
            {preview ? (
              <div className="previewCircle">
                <img src={preview} alt="" />
              </div>
            ) : (
              <div className="uploadCircle">
                <Camera size={44} />
                <span>사진 추가</span>
              </div>
            )}
          </label>

          <input
            id="petImage"
            type="file"
            accept="image/*"
            className="fileInput"
            onChange={handleImageChange}
          />
        </div>

        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="반려동물 이름을 입력해주세요"
          label="이름"
        />

        <TextInput
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="예) 말티즈"
          label="품종"
        />

        <TextInput
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="나이를 입력해주세요"
          label="나이"
        />

        <div className="field">
          <label>종류</label>
          <div className="segment">
            <div className="segmentItem">
              <input type="radio" id="type-dog" name="type" value="강아지" />
              <label htmlFor="type-dog">강아지</label>
            </div>
            <div className="segmentItem">
              <input type="radio" id="type-cat" name="type" value="고양이" />
              <label htmlFor="type-cat">고양이</label>
            </div>
          </div>
        </div>

        <div className="field">
          <label>성별</label>
          <div className="segment">
            <div className="segmentItem">
              <input type="radio" id="gender-male" name="gender" value="남아" />
              <label htmlFor="gender-male">남아</label>
            </div>
            <div className="segmentItem">
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="여아"
              />
              <label htmlFor="gender-female">여아</label>
            </div>
          </div>
        </div>
        <button type="submit" className="submitButton">
          등록하기
        </button>
      </form>
    </section>
  );
}
