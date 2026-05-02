export type RangeSliderTick = {
  value: number;
  label: string;
};

export type RangeSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  step?: number;
  formatLabel?: (value: number) => string;
  ticks?: RangeSliderTick[];
  ariaLabel?: string;
  disabled?: boolean;
};
