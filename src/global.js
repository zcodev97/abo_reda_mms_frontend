function formatDate(dateObject = new Date()) {
  const formattedDateString = `${dateObject.getFullYear()}-${(
    dateObject.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;

  return formattedDateString;
}

// const SYSTEM_URL = "http://38.180.105.203:8000/";
// const SYSTEM_URL = "http://192.168.68.106:8000/";
const SYSTEM_URL = "http://127.0.0.1:8000/";

export { formatDate, SYSTEM_URL };
