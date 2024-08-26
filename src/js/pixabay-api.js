"use strict";

import axios from "axios";

const BASE_URL = "https://pixabay.com/api";

axios.defaults.baseURL = BASE_URL;

export default async function fetchFrom(query) {
  const API_KEY = process.env.API_KEY;
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
