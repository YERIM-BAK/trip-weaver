"use client";

import { DayPicker, DateRange } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import "react-day-picker/style.css";
import styles from "./DatePicker.module.scss";
import { useDatePickerPopover } from "./hooks/useDatePickerPopover";
import { formatDate } from "./utils/formatDate";
import {
  DatePickerProps,
  SingleDatePickerProps,
  RangeDatePickerProps,
  MultiDatePickerProps,
} from "./DatePicker.types";

function getTriggerText(props: DatePickerProps): string {
  if (props.mode === "single") {
    return props.value ? formatDate(props.value) : "날짜 선택";
  }
  if (props.mode === "range") {
    const { startDate, endDate } = props.value;
    if (!startDate) return "날짜 선택";
    if (!endDate) return `${formatDate(startDate)} ~`;
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
  }
  // multiple
  if (props.value.length === 0) return "날짜 선택";
  if (props.value.length === 1) return formatDate(props.value[0]);
  return `${formatDate(props.value[0])} 외 ${props.value.length - 1}일`;
}

function isEmpty(props: DatePickerProps): boolean {
  if (props.mode === "single") return !props.value;
  if (props.mode === "range") return !props.value.startDate;
  return props.value.length === 0;
}

function DatePicker(props: DatePickerProps) {
  const { mode, disabled, minDate, maxDate } = props;
  const { open, toggle, close, ref, popoverRef } = useDatePickerPopover();

  const disabledDays = [
    ...(minDate ? [{ before: minDate }] : []),
    ...(maxDate ? [{ after: maxDate }] : []),
  ];

  const renderCalendar = () => {
    if (mode === "single") {
      const { value, onChange } = props as SingleDatePickerProps;
      return (
        <DayPicker
          mode="single"
          locale={ko}
          selected={value}
          onSelect={(date) => {
            onChange(date);
            close();
          }}
          disabled={disabledDays}
        />
      );
    }

    if (mode === "range") {
      const { value, onChange } = props as RangeDatePickerProps;
      return (
        <DayPicker
          mode="range"
          locale={ko}
          selected={{ from: value.startDate, to: value.endDate }}
          onSelect={(range: DateRange | undefined) => {
            onChange({
              startDate: range?.from,
              endDate: range?.to,
            });
          }}
          disabled={disabledDays}
        />
      );
    }

    // multiple
    const { value, onChange } = props as MultiDatePickerProps;
    return (
      <DayPicker
        mode="multiple"
        locale={ko}
        selected={value}
        onSelect={(dates) => onChange(dates ?? [])}
        disabled={disabledDays}
      />
    );
  };

  return (
    <div className={styles["datePicker"]} ref={ref}>
      <button
        type="button"
        className={styles["datePickerTrigger"]}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="날짜 선택"
        disabled={disabled}
        onClick={toggle}
        data-empty={isEmpty(props)}
      >
        <span aria-hidden="true">📅</span>
        <span>{getTriggerText(props)}</span>
        <span aria-hidden="true">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          ref={popoverRef}
          className={styles["datePickerPopover"]}
          role="dialog"
          aria-label="날짜 선택 달력"
          aria-modal="true"
        >
          {renderCalendar()}
        </div>
      )}
    </div>
  );
}

export default DatePicker;
