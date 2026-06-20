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
  contenttypeid?: string;
};

export type SpotCardProps = {
  spot: Spot;
  order?: number;
  onAddToCourse?: () => void;
  isAdded?: boolean;
  className?: string;
};
