"use strict";

import axios from "axios";

const API_KEY = "34523545-f21683fd59bfc3e4e2549fe07";
const BASE_URL = "https://pixabay.com/api";

axios.defaults.baseURL = BASE_URL;

export default async function fetchFrom(query, perPage, curPage) {
  // set default perPage if not provided
  if (perPage === undefined || perPage === null || perPage < 1) {
    perPage = 15;
  }

  const params = {
    key: API_KEY,
    q: String(query),
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: perPage,
    page: curPage,
  };

  return axios.get("/", { params });
}
