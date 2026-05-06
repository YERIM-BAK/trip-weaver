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
  name: string;
  category: string;
  description: string;
  address: string;
  duration: string;
  lat: number;
  lng: number;
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
}

export type SpotCardProps = {
  spot: Spot;
  order: number;
}

