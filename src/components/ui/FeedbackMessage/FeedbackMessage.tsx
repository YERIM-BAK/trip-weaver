"use client";

import Image from "next/image";
import { FeedbackMessageProps, FeedbackStatus } from "./FeedbackMessage.types";
import styles from "./FeedbackMessage.module.scss";
import successIcon from "@/assets/images/icons/icon_comm_confirm_72.svg";
import errorIcon from "@/assets/images/icons/ico_comm_error_72.svg";
import warningIcon from "@/assets/images/icons/icon_comm_confirm_72.svg";

const iconMap: Record<FeedbackStatus, string> = {
  success: successIcon,
  error: errorIcon,
  warning: warningIcon,
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
