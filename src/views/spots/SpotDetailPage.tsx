import ImageSwiper from "@/components/ui/Swiper/ImageSwiper";
import Tag from "@/components/ui/Tag/Tag";
import { CONTENT_TYPE_MAP } from "@/constants/tour";
import { CommonDetail, PetDetail } from "@/features/course/course.types";
import { SpotImage, SpotInfoItem } from "@/lib/petTour/petTour.types";

interface Props {
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
}: Props) {
  if (!common && !pet) return null;

  return (
    <div className="spotDetailPage">
      {common?.firstimage && (
        // <div className="heroImg">
        //   <img src={common.firstimage} alt={common.title} />
        // </div>
        <ImageSwiper images={images} fallback={common?.firstimage} />
      )}

      <div className="pageBody">
        <div className="titleRow">
          {common?.contenttypeid && (
            <Tag size="sm" color="sky">
              {CONTENT_TYPE_MAP[common.contenttypeid] ?? "기타"}
            </Tag>
          )}
          <h1 className="pageTitle">{common?.title}</h1>
        </div>

        <section className="section">
          <h2 className="sectionTitle">기본 정보</h2>
          <ul className="infoList">
            <InfoRow label="주소" value={common?.addr1} />
            <InfoRow label="전화" value={common?.tel ?? intro?.infocenter} />
            <InfoRow
              label="운영시간"
              value={
                intro?.opentimefood ?? intro?.usetime ?? intro?.opentimeculture
              }
            />
            <InfoRow
              label="휴무일"
              value={
                intro?.restdatefood ?? intro?.restdate ?? intro?.restdateculture
              }
            />
            <InfoRow
              label="입장료"
              value={intro?.usefee ?? intro?.discountinfofood}
            />
            <InfoRow
              label="주차"
              value={
                intro?.parkingfood ?? intro?.parking ?? intro?.parkingculture
              }
            />
          </ul>
        </section>

        {common?.overview && (
          <section className="section">
            <h2 className="sectionTitle">소개</h2>
            <p className="desc">{common.overview.replace(/<[^>]+>/g, "")}</p>
          </section>
        )}

        {pet && (
          <section className="section">
            <h2 className="sectionTitle">반려동물 동반 정보</h2>
            <ul className="infoList">
              <InfoRow label="동반 가능 동물" value={pet.acmpyTypeCd} />
              <InfoRow label="입장 가능 구역" value={pet.acmpyPsblCpam} />
              <InfoRow label="동반 조건" value={pet.relaAcomdInfo} />
              <InfoRow label="최대 크기" value={pet.acmpyNeedMtr} />
              <InfoRow label="편의시설" value={pet.etcAcmpyInfo} />
              <InfoRow label="유의사항" value={pet.acmpyInfoCd} />
              {pet.relaPetsRoomInfo && (
                <InfoRow label="반려동물 객실" value={pet.relaPetsRoomInfo} />
              )}
            </ul>
          </section>
        )}

        {infoList.length > 0 && (
          <section className="section">
            <h2 className="sectionTitle">추가 정보</h2>
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

        <div className="actionRow">
          <button type="button" className="btn btn-secondary">
            북마크
          </button>
          <button type="button" className="btn btn-primary">
            + 일정에 추가
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <li className="infoRow">
      <span className="infoLabel">{label}</span>
      <span className="infoValue">{value}</span>
    </li>
  );
}
