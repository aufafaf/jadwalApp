export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
};

export const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return dayNames[date.getDay()];
};

export const sortByDate = (a: { date: string }, b: { date: string }): number => {
  const dateA = new Date(a.date.split(" ").reverse().join(" "));
  const dateB = new Date(b.date.split(" ").reverse().join(" "));
  return dateA.getTime() - dateB.getTime();
};
