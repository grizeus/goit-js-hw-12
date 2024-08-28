"use strict";

import fetchFrom from "./js/pixabay-api.js";
import renderGallery from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "./css/custom-izitoast.css";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "./css/custom-slb.css";
import errSvg from "./img/error.svg";

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const loadMoreButton = document.querySelector(".load-btn");
const topLoader = document.querySelector(".in-loader");
const moreLoader = document.querySelector(".more-loader");
const gallery = document.querySelector("ul.gallery-list");

let curPage = 1;
let maxPages = 0;
const perPage = 15;
let searchQuery = "";
let galleryCardHeight = 0;

const TOAST_CONFIG = {
  titleSize: "16px",
  maxWidth: "432px",
  position: "topRight",
  closeOnEscape: true,
  icon: "error",
  iconUrl: errSvg,
  theme: "dark",
};

const lightbox = new simpleLightbox(".gallery-list a", {
  captionsData: "alt",
  captionDelay: 250,
});

searchButton.addEventListener("click", async e => {
  e.preventDefault();

  searchQuery = searchInput.value.trim();

  if (searchQuery === "") {
    gallery.innerHTML = "";
    loadMoreButton.classList.add("visually-hidden");
    return;
  }

  if (!loadMoreButton.classList.contains("visually-hidden")) {
    loadMoreButton.classList.remove("visually-hidden");
  }
  gallery.innerHTML = "";
  topLoader.classList.toggle("visually-hidden");
  curPage = 1;

  try {
    const { data } = await fetchFrom(searchQuery, perPage, curPage);
    if (!data.totalHits) {
      gallery.innerHTML = "";
      topLoader.classList.add("visually-hidden");
      iziToast.error({
        ...TOAST_CONFIG,
        message:
          "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    gallery.insertAdjacentHTML("beforeend", renderGallery(data));
    topLoader.classList.add("visually-hidden");
    loadMoreButton.classList.remove("visually-hidden");

    if (data.totalHits < perPage) {
      loadMoreButton.classList.add("visually-hidden");
      iziToast.info({
        position: "topRight",
        message: "We're sorry, but you've reached the end of search results.",
      });;
    }
    maxPages = Math.ceil(data.totalHits / perPage);
    lightbox.refresh();
  } catch (error) {
    console.error(error);
    return;
  }
});

loadMoreButton.addEventListener("click", async e => {
  e.preventDefault();

  moreLoader.classList.remove("visually-hidden");
  loadMoreButton.classList.add("visually-hidden");

  try {
    const { data } = await fetchFrom(searchQuery, perPage, ++curPage);
    gallery.insertAdjacentHTML("beforeend", renderGallery(data));

    moreLoader.classList.add("visually-hidden");
    loadMoreButton.classList.remove("visually-hidden");
    lightbox.refresh();
    if (!galleryCardHeight) {
      galleryCardHeight = document
        .querySelector(".gallery-item")
        .getBoundingClientRect().height;
    }

    window.scrollBy({
      top: galleryCardHeight * 2,
      behavior: "smooth",
    });

    if (maxPages === curPage) {
      loadMoreButton.classList.add("visually-hidden");
      iziToast.info({
        position: "topRight",
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error(error);
  }
});
