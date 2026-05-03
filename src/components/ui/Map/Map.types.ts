export type MapProvider = "kakao" | "google";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapMarker {
  id: string;
  position: LatLng;
  label?: string;
  active?: boolean;
}

export interface MapProps {
  center: LatLng;
  markers?: MapMarker[];
  polyline?: LatLng[];
  onMarkerClick?: (id: string) => void;
  zoom?: number;
  className?: string;
}
