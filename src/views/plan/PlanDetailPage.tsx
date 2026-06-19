import { PlanDetail } from "@/features/plan/plan.types";
import {
  Camera,
  Car,
  ChevronDown,
  ChevronLeft,
  MapPin,
  MoreHorizontal,
  PawPrint,
  Pencil,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  plan: PlanDetail;
}

export default function PlanDetailPage({ plan }: Props) {
  return (
    <div className="planDetail">
      <div className="planHero">
        <Image
          src={plan.coverImage || "/images/photo.jpg"}
          alt={plan.title}
          fill
          style={{ objectFit: "cover" }}
        />

        <div className="planHeroHeader">
          <div className="planHeroActions">
            <button type="button" className="iconBtn" aria-label="수정">
              <Pencil size={18} />
            </button>
            <button type="button" className="iconBtn" aria-label="공유">
              <Share2 size={18} />
            </button>
            <button type="button" className="iconBtn" aria-label="더보기">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="planHeroBody">
          <span className="planHeroStatus">{plan.status}</span>
          <h1 className="planHeroTitle">{plan.title}</h1>
          <p className="planHeroDate">
            {plan.startDate} ~ {plan.endDate} ({plan.nights}박 {plan.nights + 1}
            일)
          </p>
          <div className="planHeroPet">
            <Image
              src={plan.petImage}
              alt={plan.petName}
              width={28}
              height={28}
              className="planHeroPetImg"
            />
            <span>{plan.petName}와 함께한 여행</span>
          </div>
        </div>
      </div>

      <div className="planStatCard">
        <div className="planStatItem">
          <MapPin size={20} className="planStatIcon icon-green" />
          <span className="planStatLabel">방문 장소</span>
          <strong className="planStatValue">{plan.spotCount}곳</strong>
        </div>
        <div className="planStatItem">
          <Camera size={20} className="planStatIcon icon-purple" />
          <span className="planStatLabel">사진</span>
          <strong className="planStatValue">{plan.photoCount}장</strong>
        </div>
        <div className="planStatItem">
          <PawPrint size={20} className="planStatIcon icon-orange" />
          <span className="planStatLabel">함께한 반려동물</span>
          <strong className="planStatValue">{plan.petName}</strong>
        </div>
        <div className="planStatItem">
          <Car size={20} className="planStatIcon icon-blue" />
          <span className="planStatLabel">이동 수단</span>
          <strong className="planStatValue">{plan.transport}</strong>
        </div>
      </div>

      <section className="section">
        <div className="titleWrap">
          <h2 className="sectionTitle">
            여행 사진 <span className="sectionCount">{plan.photoCount}장</span>
          </h2>
          <Link href={`/plan/${plan.id}/photos`} className="link-btn">
            <span className="link-btn-text">전체보기</span>
          </Link>
        </div>

        <div className="photoGrid">
          {plan.photos.slice(0, 4).map((photo) => (
            <div key={photo.id} className="photoGridItem">
              <Image
                src={photo.url}
                alt={photo.alt ?? ""}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="titleWrap">
          <h2 className="sectionTitle">
            방문 장소 <span className="sectionCount">{plan.spotCount}곳</span>
          </h2>
          <Link href={`/plan/${plan.id}/spots`} className="link-btn">
            <span className="link-btn-text">전체보기</span>
          </Link>
        </div>

        <div className="spotScroll">
          {/* spots.map(spot => (
            <div className="spotScrollItem" key={spot.id}>
              <div className="spotScrollImg">
                <Image src={spot.image} alt={spot.name} fill style={{ objectFit: "cover" }} />
                <button className="spotScrollHeart" aria-label="북마크">
                  <Heart size={16} />
                </button>
              </div>
              <p className="spotScrollName">{spot.name}</p>
              <Tag size="sm" color="green">{spot.category}</Tag>
            </div>
          )) */}
        </div>
      </section>

      <section className="section">
        <h2 className="sectionTitle">여행 지도</h2>
        <div className="planMapWrap">
          {/* 카카오맵 또는 정적 지도 이미지 */}
          <button
            type="button"
            className="planMapArrow"
            aria-label="지도 펼치기"
          >
            <ChevronLeft size={18} style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>
      </section>

      <section className="section">
        <Link href={`/my/pets`} className="planFriendRow">
          <h2 className="sectionTitle">함께한 친구</h2>
          <div className="planFriendInfo">
            <Image
              src={plan.petImage}
              alt={plan.petName}
              width={36}
              height={36}
              className="planFriendImg"
            />
            <span className="planFriendName">{plan.petName} (비숑, 3살)</span>
          </div>
          <ChevronLeft size={18} style={{ transform: "rotate(180deg)" }} />
        </Link>
      </section>

      <section className="section">
        <h2 className="sectionTitle">여행 기록</h2>
        <div className="planRecordText">
          <span>1일차</span>
          <p>몽이와 함께한 첫 제주 여행!</p>
        </div>
        <button type="button" className="planRecordMore">
          더보기 <ChevronDown size={14} />
        </button>
      </section>

      {/* <section className="section">
        <h2 className="sectionTitle">여행 태그</h2>
        <div className="planTagList">
          <span className="planTag">#몽이와함께</span>
          <span className="planTag">#첫제주여행</span>
          <span className="planTag">#제주바다</span>
          <span className="planTag">#행복한기억</span>
        </div>
      </section> */}

      <section className="section">
        <div className="titleWrap">
          <h2 className="sectionTitle">여행 일정</h2>
          <Link href={`/plan/${plan.id}/schedule`} className="link-btn">
            <span className="link-btn-text">상세 일정 보기</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
