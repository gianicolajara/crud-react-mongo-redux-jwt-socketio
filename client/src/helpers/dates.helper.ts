export const showDate = (date: Date | string): string | null => {
  if (!date) return null;
  let t: Date | null = null;
  if (typeof date === "string") t = new Date(date);

  let hours: number = (t as Date).getHours();
  let minutes: number = (t as Date).getMinutes();
  let seconds: number = (t as Date).getSeconds();

  let day: number = (t as Date).getDate();
  let month: number = (t as Date).getMonth() + 1;
  let year: number = (t as Date).getFullYear();

  return `${day <= 9 ? `0${day}` : day}-${
    month <= 9 ? `0${month}` : month
  }-${year} ${hours}:${minutes <= 9 ? `0${minutes}` : minutes}:${
    seconds <= 9 ? `0${seconds}` : seconds
  }`;
};
