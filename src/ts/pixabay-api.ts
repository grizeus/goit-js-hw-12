import axios from "axios";
import "dotenv/config";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://pixabay.com/api";

axios.defaults.baseURL = BASE_URL;

export default async function fetchFrom(
  query: string,
  perPage?: number,
  curPage = 1
): Promise<any> {
  // set default perPage if not provided
  if (perPage === undefined || perPage === null || perPage < 1) {
    perPage = 15;
  }

  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: perPage,
    page: curPage,
  };

  return axios.get("/", { params });
}
