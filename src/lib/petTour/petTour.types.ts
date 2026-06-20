export interface LocationBasedItem {
  contentid: string;
  contenttypeid: string;
  title: string;
  addr1: string;
  addr2?: string;
  mapx: string;
  mapy: string;
  dist: string;
  firstimage?: string;
  firstimage2?: string;
}

export interface PetTourInfo {
  contentid: string;
  relaAcdnt: string;
  acmpyTypeCd: string;
  acmpyPsblCpam: string;
  acmpyNeedMtr: string;
  petAcmpyBasisCl: string;
  petInfo: string;
  relaPurcPrm: string;
}

export interface PetSpot extends LocationBasedItem, PetTourInfo {}

// 인기 관광지 (조회수/추천수 기준)
export interface FetchPopularSpotsOptions {
  areaCode?: string;
  numOfRows?: number;
  pageNo?: number;
  contentTypeId?: string;
}

export interface FetchPopularSpotsResult {
  spots: PetSpot[];
  totalCount: number;
}

export interface CommonDetail {
  firstimage?: string;
  title?: string;
  contenttypeid?: string;
  addr1?: string;
  tel?: string;
  overview?: string;
}

export interface PetDetail {
  acmpyTypeCd?: string;
  acmpyPsblCpam?: string;
  relaAcomdInfo?: string;
  acmpyNeedMtr?: string;
  etcAcmpyInfo?: string;
  acmpyInfoCd?: string;
  relaPetsRoomInfo?: string;
}

export interface SpotImage {
  originimgurl: string;
  imgname: string;
  serialnum: string;
  smallimageurl?: string;
  cpyrhtDivCd?: string;
  contentid?: string;
}

export interface SpotInfoItem {
  infoname: string;
  infotext: string;
  serialnum: string;
}
