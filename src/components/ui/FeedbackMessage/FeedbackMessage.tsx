"use client";

import Image from "next/image";
import { FeedbackMessageProps, FeedbackStatus } from "./FeedbackMessage.types";
import styles from "./FeedbackMessage.module.scss";

const iconMap: Record<FeedbackStatus, string> = {
  success: "/icons/feedback-success.svg",
  error: "/icons/feedback-error.svg",
  warning: "/assets/images/icons/icon_comm_confirm_72.svg",
};

const altMap: Record<FeedbackStatus, string> = {
  success: "성공",
  error: "오류",
  warning: "경고",
};

export default function FeedbackMessage({
  status,
  title,
  subtitle,
  description,
}: FeedbackMessageProps) {
  return (
    <div className={styles["feedbackMessage"]}>
      <Image
        src={iconMap[status]}
        alt={altMap[status]}
        width={64}
        height={64}
        className={styles["icon"]}
      />
      <h2 className={styles["title"]}>{title}</h2>
      {subtitle && <p className={styles["subtitle"]}>{subtitle}</p>}
      {description && <p className={styles["description"]}>{description}</p>}
    </div>
  );
}