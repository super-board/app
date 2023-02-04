const WEEK_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;
const HOUR_MILLISECONDS = 60 * 60 * 1000;
const MINUTE_MILLISECONDS = 60 * 1000;

export function toRelativeTime(isoString: string): string {
  const time = new Date(isoString).getTime();
  const difference = Date.now() - time;

  if (difference > WEEK_MILLISECONDS) return isoString.slice(2, 10);
  if (difference > DAY_MILLISECONDS) {
    const days = Math.floor(difference / DAY_MILLISECONDS);
    return `${days}일 전`;
  }
  if (difference > HOUR_MILLISECONDS) {
    const hours = Math.floor(difference / HOUR_MILLISECONDS);
    return `${hours}시간 전`;
  }
  if (difference > MINUTE_MILLISECONDS) {
    const minutes = Math.floor(difference / MINUTE_MILLISECONDS);
    return `${minutes}분 전`;
  }
  return "방금 전";
}
