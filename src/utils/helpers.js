export function convertDateFormat(createdAt) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(createdAt);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().substr(2);

  return `${day} ${month} ${year}`;
}
