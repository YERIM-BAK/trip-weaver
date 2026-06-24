"use client";
import ImageSwiper from "@/components/ui/Swiper/ImageSwiper";
import {
  ChevronRight,
  ChevronDown,
  Share2,
  Heart,
  Navigation,
  Phone,
  MessageSquareText,
  MapPin,
  Clock,
  CalendarDays,
  Ticket,
  Car,
  Star,
  PawPrint,
  Plus,
} from "lucide-react";
// import Tag from "@/components/ui/Tag/Tag";
import { CONTENT_TYPE_MAP } from "@/constants/tour";

import {
  CommonDetail,
  PetDetail,
  SpotImage,
  SpotInfoItem,
} from "@/lib/petTour/petTour.types";
import { ReactNode, useState } from "react";
import { clean } from "@/lib/utils";
import Button from "@/components/ui/Button/Button";
import { useAuthStore } from "@/store/auth.store";
import {
  useIsBookmarked,
  useToggleBookmark,
} from "@/features/bookmark/hooks/useBookmarks";

interface Props {
  contentId: string;
  common: CommonDetail | null;
  pet: PetDetail | null;
  intro: any;
  infoList: SpotInfoItem[];
  images: SpotImage[];
  rating?: number;
  reviewCount?: number;
  petReview?: { text: string; thumbnail?: string };
}

export default function SpotDetailPage({
  common,
  pet,
  intro,
  infoList,
  images,
  rating,
  reviewCount,
  petReview,
  contentId,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const { data: liked = false } = useIsBookmarked(contentId);
  const { mutate: toggleBookmark, isPending: pending } = useToggleBookmark();

  const user = useAuthStore((s) => s.user);
  const handleBookmark = () => {
    if (!user) {
      alert("로그인이 필요한 기능이에요.");
      return;
    }
    toggleBookmark({ id: contentId, next: !liked });
  };

  if (!common && !pet) return null;

  const address = common?.addr1;
  const phone = common?.tel ?? intro?.infocenter;
  const openTime =
    intro?.opentimefood ?? intro?.usetime ?? intro?.opentimeculture;
  const restDate =
    intro?.restdatefood ?? intro?.restdate ?? intro?.restdateculture;
  const useFee = intro?.usefee ?? intro?.discountinfofood;
  const parking = intro?.parkingfood ?? intro?.parking ?? intro?.parkingculture;
  const overview = clean(common?.overview);
  const region = address ? address.split(" ").slice(1, 3).join(" ") : undefined;

  const handleDirections = () => {
    if (!address) return;
    window.open(
      `https://map.kakao.com/link/search/${encodeURIComponent(address)}`,
      "_blank",
    );
  };
  const handleCall = () => phone && (window.location.href = `tel:${phone}`);
  const handleShare = async () => {
    const data = { title: common?.title ?? "", url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* 사용자가 취소 */
      }
    } else {
      await navigator.clipboard?.writeText(data.url);
    }
  };

  return (
    <div className="spotDetailPage">
      <div className="spotVisual">
        <div className="spotVisualImage">
          {common?.firstimage ? (
            <ImageSwiper images={images} fallback={common?.firstimage} />
          ) : (
            <div className="hero__placeholder" />
          )}
          <span className="hero__scrim" aria-hidden />
        </div>

        <div className="spotVisualTopbar">
          <div className="spotVisualtopActions">
            <button
              type="button"
              className="iconCircle"
              aria-label="공유하기"
              onClick={handleShare}
            >
              <Share2 />
            </button>
            <button
              type="button"
              className={`iconCircle ${liked ? "is-liked" : ""}`}
              aria-label="북마크"
              aria-pressed={liked}
              disabled={pending}
              onClick={handleBookmark}
            >
              <Heart fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <div className="spotVisualInfo">
          {common?.contenttypeid && (
            <span className="tag">
              {CONTENT_TYPE_MAP[common.contenttypeid] ?? "기타"}
            </span>
          )}
          <h1 className="title">{common?.title}</h1>
          <div className="meta">
            {rating != null && (
              <span className="rating">
                <Star size={15} fill="currentColor" strokeWidth={0} />
                {rating}
                {reviewCount != null && (
                  <em className="reviewCount">({reviewCount})</em>
                )}
              </span>
            )}
            {rating != null && region && <span className="dot" />}
            {region && <span>{region}</span>}
          </div>
        </div>
      </div>

      <div className="pageBody">
        <div className="scheduleCta">
          <Button leftIcon={<Plus />} variant="primary" fullWidth={true}>
            일정에 추가
          </Button>
          <p className="scheduleCtaHint">여행 일정에 추가하여 관리해보세요!</p>
        </div>

        <nav className="quickActions" aria-label="빠른 실행">
          <button
            type="button"
            className="quickAction"
            onClick={handleDirections}
          >
            <span className="quickActionIcon">
              <Navigation />
            </span>
            길찾기
          </button>
          <button
            type="button"
            className="quickAction"
            onClick={handleCall}
            disabled={!phone}
          >
            <span className="quickActionIcon">
              <Phone />
            </span>
            전화하기
          </button>
          <button type="button" className="quickAction" onClick={handleShare}>
            <span className="quickActionIcon">
              <Share2 />
            </span>
            공유하기
          </button>
          <button type="button" className="quickAction">
            <span className="quickActionIcon">
              <MessageSquareText />
            </span>
            리뷰보기
          </button>
        </nav>

        {address && (
          <button
            type="button"
            className="card addressCard"
            onClick={handleDirections}
          >
            <span className="addressCard__pin">
              <MapPin />
            </span>
            <span className="addressCard__body">
              <span className="addressCard__label">주소</span>
              <span className="addressCard__value">{address}</span>
            </span>
            <ChevronRight className="addressCard__chevron" />
          </button>
        )}

        <section className="card">
          <h2 className="cardTitle">기본 정보</h2>
          <ul className="infoList">
            <InfoRow icon={<Clock />} label="운영시간" value={openTime} />
            <InfoRow icon={<CalendarDays />} label="휴무일" value={restDate} />
            <InfoRow icon={<Ticket />} label="입장료" value={useFee} />
            <InfoRow icon={<Car />} label="주차" value={parking} />
          </ul>
        </section>

        {overview && (
          <section className="card">
            <h2 className="cardTitle">소개</h2>
            <p className={`overview ${expanded ? "is-open" : ""}`}>
              {overview}
            </p>
            <button
              type="button"
              className="moreToggle"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "접기" : "더보기"}
              <ChevronDown className={expanded ? "is-flip" : ""} />
            </button>
          </section>
        )}

        {pet && (
          <section className="card">
            <h2 className="cardTitle">
              <PawPrint className="cardTitle__icon" />
              반려동물 동반 정보
            </h2>
            <ul className="infoList">
              <InfoRow label="동반 가능" value={pet.acmpyTypeCd} />
              <InfoRow label="입장 가능 구역" value={pet.acmpyPsblCpam} />
              <InfoRow label="최대 크기" value={pet.acmpyNeedMtr} />
              <InfoRow label="동반 조건" value={pet.relaAcomdInfo} />
              {pet.relaPetsRoomInfo && (
                <InfoRow label="반려동물 객실" value={pet.relaPetsRoomInfo} />
              )}
              {pet.etcAcmpyInfo && (
                <InfoRow label="편의시설" value={clean(pet.etcAcmpyInfo)} />
              )}
            </ul>

            {clean(pet.acmpyInfoCd) && (
              <p className="petNote">{clean(pet.acmpyInfoCd)}</p>
            )}

            {petReview && (
              <div className="petReview">
                <span className="petReview__avatar">
                  {petReview.thumbnail ? (
                    <img src={petReview.thumbnail} alt="" />
                  ) : (
                    <PawPrint />
                  )}
                </span>
                <span className="petReview__body">
                  <strong>맹댕이가 다녀왔어요!</strong>
                  <span>{clean(petReview.text)}</span>
                </span>
                <ChevronRight className="petReview__chevron" />
              </div>
            )}
          </section>
        )}

        {infoList.length > 0 && (
          <section className="card">
            <h2 className="cardTitle">추가 정보</h2>
            <ul className="infoList">
              {infoList.map((info, idx) => (
                <InfoRow
                  key={`${info.serialnum}-${idx}`}
                  label={info.infoname}
                  value={info.infotext}
                />
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value?: string;
}) {
  const v = clean(value);
  if (!v) return null;
  return (
    <li className="infoRow">
      {icon && <span className="infoIcon">{icon}</span>}
      <span className="infoLabel">{label}</span>
      <span className="infoValue">{v}</span>
    </li>
  );
}
