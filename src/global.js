function formatDate(dateObject = new Date()) {
  // Format the date using various Date methods
  const hours = dateObject.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
  const amPm = dateObject.getHours() >= 12 ? "PM" : "AM";

  const formattedDateString = `${dateObject.getFullYear()}-${(
    dateObject.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dateObject
    .getDate()
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${dateObject
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${amPm}`;

  return formattedDateString;
}

const SYSTEM_URL = "http://127.0.0.1:8000/";

export { formatDate, SYSTEM_URL };
