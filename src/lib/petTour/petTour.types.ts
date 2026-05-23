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
