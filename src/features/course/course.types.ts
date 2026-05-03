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
