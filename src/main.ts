import fetchFrom from "./ts/pixabay-api.ts";
import renderGallery from "./ts/render.ts";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "./css/custom-izitoast.css";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "./css/custom-slb.css";
import {
  TOAST_CONFIG,
  handleEmptyResponse,
  validateSearchQuery,
  addVisibility,
  removeVisibility,
  handleError,
  scrollBy,
} from "./ts/helpers.ts";

const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const searchButton = document.querySelector(".search-btn") as HTMLButtonElement;
const loadMoreButton = document.querySelector(".load-btn") as HTMLButtonElement;
const topLoader = document.querySelector(".in-loader") as HTMLSpanElement;
const moreLoader = document.querySelector(".more-loader") as HTMLSpanElement;
const gallery = document.querySelector("ul.gallery-list") as HTMLUListElement;

let curPage: number = 1;
let maxPages: number = 0;
const perPage: number = 15;
let searchQuery: string = "";
let galleryCardHeight: number = 0;

const lightbox: simpleLightbox = new simpleLightbox(".gallery-list a", {
  captionsData: "alt",
  captionDelay: 250,
});

searchButton.addEventListener("click", async e => {
  e.preventDefault();

  searchQuery = searchInput?.value.trim() ?? "";
  if (!validateSearchQuery(searchQuery, gallery, loadMoreButton, topLoader)) {
    return;
  }
  curPage = 1;

  try {
    const { data } = await fetchFrom(searchQuery, perPage, curPage);
    
    if (!handleEmptyResponse(data, gallery, topLoader, loadMoreButton, moreLoader)) {
      return;
    }

    gallery.insertAdjacentHTML("beforeend", renderGallery(data));
    removeVisibility(topLoader);
    addVisibility(loadMoreButton);

    if (data.totalHits && data.totalHits < perPage) {
      removeVisibility(loadMoreButton);
      iziToast.info({
        ...TOAST_CONFIG,
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    maxPages = Math.ceil(data.totalHits / perPage);
    lightbox.refresh();
  } catch (error) {
    handleError(error, loadMoreButton, topLoader, moreLoader);
  }
});

loadMoreButton.addEventListener("click", async e => {
  e.preventDefault();

  addVisibility(moreLoader);
  removeVisibility(loadMoreButton);

  try {
    const { data } = await fetchFrom(searchQuery, perPage, ++curPage);

    handleEmptyResponse(data, gallery, topLoader, loadMoreButton, moreLoader);

    gallery.insertAdjacentHTML("beforeend", renderGallery(data));

    removeVisibility(moreLoader);
    addVisibility(loadMoreButton);

    lightbox.refresh();

    scrollBy(galleryCardHeight);

    if (maxPages === curPage) {
      removeVisibility(loadMoreButton);
      iziToast.info({
        ...TOAST_CONFIG,
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error: any) {
    handleError(error, loadMoreButton, topLoader, moreLoader);
  }
});
