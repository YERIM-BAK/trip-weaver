import clsx from "clsx";
import styles from "./PlanCard.module.scss";
import Link from "next/link";
import Image from "next/Image";
import Tag from "@/components/ui/Tag/Tag";

export type PlanStatus = "준비중" | "여행중" | "다녀옴";

export interface PlanCardProps {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  nights: number;
  status: PlanStatus;
  image?: string | null;
  className?: string;
}

const statusColorMap: Record<PlanStatus, "gray" | "green" | "sky"> = {
  준비중: "gray",
  여행중: "green",
  다녀옴: "sky",
};

function PlanCard({
  id,
  title,
  startDate,
  endDate,
  nights,
  status,
  image,
  className,
}: PlanCardProps) {
  return (
    <Link
      href={`/plan/${id}`}
      className={clsx(styles["planCard"], "planCard", className)}
    >
      <div className={styles["planCardImg"]}>
        <Image
          src={image || "/images/default-plan.png"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles["planCardBody"]}>
        <p className={styles["planCardTitle"]}>{title}</p>
        <p className={styles["planCardDate"]}>
          {startDate} - {endDate} · {nights}박 {nights + 1}일
        </p>
        <Tag size="sm" color={statusColorMap[status]}>
          {status}
        </Tag>
      </div>
    </Link>
  );
}
export default PlanCard;
