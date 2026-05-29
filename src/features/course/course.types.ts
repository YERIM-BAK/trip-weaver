export type Course = {
  id: number;
  title: string;
  description: string;
  distance: string;
  time: string;
  petAllowed: boolean;
  image: string;
};

export type Spot = {
  id: string;
  name: string;
  category: string;
  description?: string;
  address: string;
  duration?: string;
  lat?: number;
  lng?: number;
  image: string | null;
};

export type DayCourse = {
  day: number;
  date: string;
  spots: Spot[];
};

export type TourSpot = {
  contentid: string;
  title: string;
  addr1: string;
  firstimage: string;
  dist: string;
  contenttypeid: string;
  mapx: string;
  mapy: string;
  areacode?: string;
  sigungucode?: string;
};

export type SpotCardProps = {
  spot: Spot;
  order?: number;
  onAddToCourse?: () => void;
  isAdded?: boolean;
  className?: string;
};

export type AICourse = {
  id: string;
  title: string;
  theme: string;
  duration: string;
  petScore: number;
  summary: string;
  spots: AICourseSpot[];
};

export type AICourseSpot = {
  name: string;
  type: string;
  stayTime: string;
  tip: string;
};

// 반려동물 전용 상세 (detailPetTour2)
export type PetDetail = {
  contentid: string;
  acmpyTypeCd?: string;
  acmpyPsblCpam?: string;
  acmpyNeedMtr?: string;
  etcAcmpyInfo?: string;
  acmpyInfoCd?: string;
  relaAcomdInfo?: string;
  relaPetsRoomInfo?: string;
};

// 공통 상세 (detailCommon2)
export type CommonDetail = {
  contentid: string;
  title: string;
  addr1?: string;
  tel?: string;
  usetime?: string;
  restdate?: string;
  usefee?: string;
  parking?: string;
  overview?: string;
  firstimage?: string;
};

// 스팟 상세 화면용 (TourSpot 재사용)
export type ActiveSpot = {
  name: string;
  apiSpot: TourSpot | null; // ApiSpot 대신 기존 TourSpot 사용
  petDetail: PetDetail | null;
  commonDetail: CommonDetail | null;
};

export type CourseScreen =
  | "region"
  | "loading"
  | "courses"
  | "detail"
  | "spotDetail";
