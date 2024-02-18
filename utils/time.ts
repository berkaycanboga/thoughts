import { format, isToday, isYesterday } from "date-fns";
import { enUS } from "date-fns/locale";

export const calculateTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (60 * 1000),
  );
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes <= 1) {
    return `just now`;
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  if (diffInDays < 7) {
    return `${diffInDays}d`;
  }

  if (isToday(date)) {
    return `${format(date, "h:mm a", { locale: enUS })}`;
  }

  if (isYesterday(date)) {
    return `Yesterday`;
  }

  const currentYear = new Date().getFullYear();
  const postYear = date.getFullYear();

  if (postYear !== currentYear) {
    return `${format(date, "d MMM yyyy", { locale: enUS })}`;
  }

  return `${format(date, "MMM d", { locale: enUS })}`;
};
