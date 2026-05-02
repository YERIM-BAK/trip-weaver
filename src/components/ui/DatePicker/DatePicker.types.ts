export interface SingleDatePickerProps {
  mode: "single";
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export interface RangeDatePickerProps {
  mode: "range";
  value: { startDate: Date | undefined; endDate: Date | undefined };
  onChange: (range: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export interface MultiDatePickerProps {
  mode: "multiple";
  value: Date[];
  onChange: (dates: Date[]) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export type DatePickerProps =
  | SingleDatePickerProps
  | RangeDatePickerProps
  | MultiDatePickerProps;
