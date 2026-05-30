"use client";

import { useEffect, useState, useTransition } from "react";
import { getSpotCommonDetail, getPetTourInfo } from "@/lib/petTour/petTourApi";
import Tag from "@/components/ui/Tag/Tag";
import { CONTENT_TYPE_MAP } from "@/constants/tour";
import Skeleton from "@/components/ui/Skeleton/Skeleton";

interface Props {
  contentId: string;
}

export default function SpotDetailPage({ contentId }: Props) {
  // const [common, setCommon] = useState<any>(null);
  // const [pet, setPet] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   startTransition(async () => {
  //     const [commonData, petData] = await Promise.all([
  //       getSpotCommonDetail(contentId),
  //       getPetTourInfo(contentId),
  //     ]);
  //     console.log("commonData:", commonData);
  //     console.log("petData:", petData);
  //     setCommon(commonData);
  //     setPet(petData);
  //   });
  // }, [contentId]);

  if (isPending) {
    return (
      <div className="skeletonWrap">
        <Skeleton height={280} />
        <Skeleton height={28} />
        <Skeleton height={20} />
        <Skeleton height={20} />
      </div>
    );
  }

  // if (!common) return null;

  return (
    <div className="spotDetailPage">
      {/* {common.firstimage && (
        <div className="heroImg">
          <img src={common.firstimage} alt={common.title} />
        </div>
      )} */}
      작업중
      {/* <div className="pageBody">
        <div className="titleRow">
          <h1 className="pageTitle">{common.title}</h1>
          {common.contenttypeid && (
            <Tag size="sm" color="sky">
              {CONTENT_TYPE_MAP[common.contenttypeid] ?? "기타"}
            </Tag>
          )}
        </div>

        <section className="section">
          <h2 className="sectionTitle">기본 정보</h2>
          <ul className="infoList">
            <InfoRow label="주소" value={common.addr1} />
            <InfoRow label="전화" value={common.tel} />
            <InfoRow label="운영시간" value={common.usetime} />
            <InfoRow label="휴무일" value={common.restdate} />
            <InfoRow label="입장료" value={common.usefee} />
            <InfoRow label="주차" value={common.parking} />
          </ul>
        </section>

        {common.overview && (
          <section className="section">
            <h2 className="sectionTitle">소개</h2>
            <p className="desc">{common.overview.replace(/<[^>]+>/g, "")}</p>
          </section>
        )}

        {pet && (
          <section className="section">
            <h2 className="sectionTitle">🐾 반려동물 동반 정보</h2>
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

        <div className="actionRow">
          <button type="button" className="btn btn-secondary">
            북마크
          </button>
          <button type="button" className="btn btn-primary">
            + 일정에 추가
          </button>
        </div>
      </div> */}
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
