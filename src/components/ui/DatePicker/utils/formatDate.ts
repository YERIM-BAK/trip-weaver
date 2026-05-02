export function formatDate(date: Date | undefined): string {
  if (!date) return "";
  return date.toLocaleDateString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
}
