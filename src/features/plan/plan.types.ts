export interface Plan {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  nights: number;
  status: "준비중" | "여행중" | "다녀옴";
  image?: string | null;
}

export interface Photo {
  id: string;
  url: string;
  alt?: string;
}

export interface PlanDetail extends Omit<Plan, "image"> {
  coverImage?: string;
  petName: string;
  petImage: string;
  spotCount: number;
  photoCount: number;
  transport: string;
  photos: Photo[];
}
