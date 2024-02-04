import { format, isToday, isYesterday } from "date-fns";
import { enUS } from "date-fns/locale";

export const calculateTimeAgo = (createdAt: Date, updatedAt: Date) => {
  const dateToUse = updatedAt > createdAt ? updatedAt : createdAt;
  const isUpdated =
    updatedAt !== undefined && updatedAt !== null && updatedAt > createdAt;

  if (!(dateToUse instanceof Date)) {
    console.error("Invalid dateToUse:", dateToUse);
    return "";
  }

  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - dateToUse.getTime()) / (60 * 1000),
  );
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes <= 1) {
    return `just now${isUpdated ? " (Updated)" : ""}`;
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m${isUpdated ? " (Updated)" : ""}`;
  }

  if (diffInHours < 24) {
    return `${diffInHours}h${isUpdated ? " (Updated)" : ""}`;
  }

  if (diffInDays < 7) {
    return `${diffInDays}d${isUpdated ? " (Updated)" : ""}`;
  }

  if (isToday(dateToUse)) {
    return `${format(dateToUse, "h:mm a", { locale: enUS })}${isUpdated ? " (Updated)" : ""}`;
  }

  if (isYesterday(dateToUse)) {
    return `Yesterday${isUpdated ? " (Updated)" : ""}`;
  }

  const currentYear = new Date().getFullYear();
  const postYear = dateToUse.getFullYear();

  if (postYear !== currentYear) {
    return `${format(dateToUse, "d MMM yyyy", { locale: enUS })}${isUpdated ? " (Updated)" : ""}`;
  }

  return `${format(dateToUse, "MMM d", { locale: enUS })}${isUpdated ? " (Updated)" : ""}`;
};
