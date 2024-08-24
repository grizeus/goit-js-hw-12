import axios from "axios";

const API_KEY = "34523545-f21683fd59bfc3e4e2549fe07";
const BASE_URL = "https://pixabay.com/api";

axios.defaults.baseURL = BASE_URL;

export default function fetchFrom(query) {
  const params = {
    key: API_KEY,
    q: String(query),
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 40,
    };
    
  return axios
    .get("/", { params })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return console.error(error);
    });
}
