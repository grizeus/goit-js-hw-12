"use strict";

import fetchFrom from "./js/pixabay-api.js";
import { renderGallery, clearGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "./css/custom-izitoast.css";
import errSvg from "./img/error.svg";

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const loader = document.querySelector(".loader");

searchButton.addEventListener("click", async e => {
  e.preventDefault();
  loader.classList.toggle("visually-hidden");
  const searchQuery = searchInput.value;
  if (searchQuery === "") {
    if (!loader.classList.contains("visually-hidden")) {
      loader.classList.toggle("visually-hidden");
    }
    clearGallery();
    return;
  }
  const res = await fetchFrom(searchQuery);
  loader.classList.toggle("visually-hidden");
  if (parseInt(res.totalHits) > 0) {
    renderGallery(res.hits);
  } else {
    clearGallery();
    iziToast.error({
      titleSize: "16px",
      message:
        "Sorry, there are no images matching your search query. Please try again!",
      maxWidth: "432px",
      position: "topRight",
      closeOnEscape: true,
      icon: "error",
      iconUrl: errSvg,
      theme: "dark",
    });
  }
});
