export type SearchBoxProps = {
  value: string;
  placeholder?: string;
  isSearching?: boolean;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void);
  onSearch?: () => void;
  onKeyDown?: ((e: React.KeyboardEvent<HTMLInputElement>) => void);
};

export type KakaoPlace = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string; // lng
  y: string; // lat
}

export interface SearchResultsProps {
  results: KakaoPlace[];
  isSearching: boolean;
  onSelect: (item: KakaoPlace) => void;
}


