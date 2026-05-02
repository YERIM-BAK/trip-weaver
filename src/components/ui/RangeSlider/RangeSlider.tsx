import styles from "./RangeSlider.module.scss";
import { RangeSliderProps } from "./RangeSlider.types";

function RangeSlider({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  formatLabel,
  ticks,
  ariaLabel,
  disabled = false,
}: RangeSliderProps) {
  const label = formatLabel ? formatLabel(value) : `${value}`;
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={styles["rangeSlider"]} aria-disabled={disabled}>
      <div className={styles["valueDisplay"]}>
        <span className={styles["valueLabel"]}>1인 기준</span>
        <span className={styles["valueBadge"]}>{label}</span>
      </div>
      <div className={styles["sliderWrap"]}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles["slider"]}
          style={
            {
              "--percent": `${percent}%`,
              opacity: disabled ? 0.4 : 1,
            } as React.CSSProperties
          }
          aria-label={ariaLabel}
          aria-valuetext={label}
          disabled={disabled}
        />
      </div>
      {ticks && (
        <div className={styles["ticks"]}>
          {ticks.map((t) => (
            <span
              key={t.value}
              style={{ left: `${((t.value - min) / (max - min)) * 100}%` }}
            >
              {t.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default RangeSlider;
