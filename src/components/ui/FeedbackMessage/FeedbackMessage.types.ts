export type FeedbackStatus = "success" | "error" | "warning";

export type FeedbackMessageProps = {
  status: FeedbackStatus;
  title: string;
  subtitle?: string;
  description?: string;
}