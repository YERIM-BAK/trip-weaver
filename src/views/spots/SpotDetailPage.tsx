"use client";

import { useEffect, useState, useTransition } from "react";
import {
  getSpotCommonDetail,
  getPetTourInfo,
  getSpotIntroDetail,
} from "@/lib/petTour/petTourApi";
import Tag from "@/components/ui/Tag/Tag";
import { CONTENT_TYPE_MAP } from "@/constants/tour";
import Skeleton from "@/components/ui/Skeleton/Skeleton";

interface Props {
  contentId: string;
}

interface CommonDetail {
  firstimage?: string;
  title?: string;
  contenttypeid?: string;
  addr1?: string;
  tel?: string;
  usetime?: string;
  restdate?: string;
  usefee?: string;
  parking?: string;
  overview?: string;
}

interface PetDetail {
  acmpyTypeCd?: string;
  acmpyPsblCpam?: string;
  relaAcomdInfo?: string;
  acmpyNeedMtr?: string;
  etcAcmpyInfo?: string;
  acmpyInfoCd?: string;
  relaPetsRoomInfo?: string;
}

export default function SpotDetailPage({ contentId }: Props) {
  const [common, setCommon] = useState<CommonDetail | null>(null);
  const [pet, setPet] = useState<PetDetail | null>(null);
  const [intro, setIntro] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commonData, petData] = await Promise.all([
          getSpotCommonDetail(contentId),
          getPetTourInfo(contentId),
        ]);
        setCommon(commonData ?? null);
        setPet(petData ?? null);

        if (commonData?.contenttypeid) {
          const introData = await getSpotIntroDetail(
            contentId,
            commonData.contenttypeid,
          );
          setIntro(introData ?? null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [contentId]);

  if (isLoading) {
    return (
      <div className="skeletonWrap">
        <Skeleton height={280} />
        <Skeleton height={28} />
        <Skeleton height={20} />
        <Skeleton height={20} />
      </div>
    );
  }

  if (!common && !pet) return null;

  return (
    <div className="spotDetailPage">
      {common?.firstimage && (
        <div className="heroImg">
          <img src={common.firstimage} alt={common.title} />
        </div>
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
            <InfoRow
              label="전화"
              value={common?.tel ?? intro?.infocenterfood ?? intro?.infocenter}
            />
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
        {/* <div className="actionRow">
          <button type="button" className="btn btn-secondary">
            북마크
          </button>
          <button type="button" className="btn btn-primary">
            + 일정에 추가
          </button>
        </div> */}
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
