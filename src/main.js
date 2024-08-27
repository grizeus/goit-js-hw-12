"use strict";

import fetchFrom, { resetPageCount } from "./js/pixabay-api.js";
import { renderGallery, clearGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "./css/custom-izitoast.css";
import errSvg from "./img/error.svg";

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const loadButton = document.querySelector(".load-btn");
const topLoader = document.querySelector(".in-loader");
const moreLoader = document.querySelector(".more-loader");
let totalHits = 0;
let maxPages = 0;
const perPage = 15;
let searchQuery = "";

const TOAST_CONFIG = {
  titleSize: "16px",
  maxWidth: "432px",
  position: "topRight",
  closeOnEscape: true,
  icon: "error",
  iconUrl: errSvg,
  theme: "dark",
};

searchButton.addEventListener("click", async e => {
  e.preventDefault();
  resetPageCount();

  topLoader.classList.toggle("visually-hidden");
  searchQuery = searchInput.value.trim();

  if (searchQuery === "") {
    if (!topLoader.classList.contains("visually-hidden")) {
      topLoader.classList.toggle("visually-hidden");
    }
    clearGallery();
    return;
  }

  const res = await fetchFrom(searchQuery, perPage);

  topLoader.classList.toggle("visually-hidden");
  loadButton.classList.toggle("visually-hidden");

  totalHits = parseInt(res[0].totalHits);
  maxPages = Math.ceil(totalHits / perPage);

  if (totalHits > 0) {
    renderGallery(res);
  } else {
    clearGallery();
    if (!loadButton.classList.contains("visually-hidden")) {
      loadButton.classList.toggle("visually-hidden");
    }
    iziToast.error({
      ...TOAST_CONFIG,
      message:
        "Sorry, there are no images matching your search query. Please try again!",
    });
  }
});

loadButton.addEventListener("click", async e => {
  e.preventDefault();

  moreLoader.classList.toggle("visually-hidden");
  loadButton.classList.toggle("visually-hidden");

  const res = await fetchFrom(searchQuery, perPage);
  moreLoader.classList.toggle("visually-hidden");

  if (maxPages > res[1]) {
    const galleryCardHeight = document.querySelector(".gallery-item").getBoundingClientRect().height;
    renderGallery(res);
    window.scrollBy({
      top: galleryCardHeight * 2,
      left: 0,
      behavior: "smooth"
    });
    loadButton.classList.toggle("visually-hidden");
  } else {
    iziToast.error({
      ...TOAST_CONFIG,
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
});