import fetchFrom from "./ts/pixabay-api";
import renderGallery from "./ts/render-functions";
import iziToast, { IziToastSettings } from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "./css/custom-izitoast.css";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "./css/custom-slb.css";
import errSvg from "./img/error.svg";
import { AxiosError } from "axios";

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

const TOAST_CONFIG: IziToastSettings = {
  titleSize: "16px",
  maxWidth: 432,
  position: "topRight",
  closeOnEscape: true,
  icon: "error",
  iconUrl: errSvg,
  theme: "dark",
};

const lightbox: simpleLightbox = new simpleLightbox(".gallery-list a", {
  captionsData: "alt",
  captionDelay: 250,
});

searchButton?.addEventListener("click", async e => {
  e.preventDefault();

  searchQuery = searchInput?.value.trim() ?? "";

  if (searchQuery === "") {
    gallery.innerHTML = "";
    loadMoreButton.classList.add("visually-hidden");
    return;
  }

  gallery.innerHTML = "";
  topLoader.classList.toggle("visually-hidden");
  curPage = 1;

  try {
    const { data } = await fetchFrom(searchQuery, perPage, curPage);

    handleEmptyResponse(data);

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
      });
    }
    maxPages = Math.ceil(data.totalHits / perPage);
    lightbox.refresh();
  } catch (error) {
    if (!loadMoreButton.classList.contains("visually-hidden")) {
      loadMoreButton.classList.add("visually-hidden");
    }
    if (!topLoader.classList.contains("visually-hidden")) {
      topLoader.classList.add("visually-hidden");
    }
    if (error instanceof AxiosError) {
      console.error('Axios Error:', error.message);
      console.error('Error Details:', error.config);
      iziToast.error({
        ...TOAST_CONFIG,
        position: "topRight",
        message: `Sorry, error occured: ${error.message}. Please try again!`,
      });

      setTimeout(() => { fetchFrom(searchQuery, perPage, curPage); }, 2000);
    } else {
      console.error(error);
      iziToast.error({
        ...TOAST_CONFIG,
        position: "topRight",
        message: "Sorry, unexpected error occured. Please try again!",
      });
    }
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
    if (galleryCardHeight === 0) {
      galleryCardHeight =
        document.querySelector(".gallery-item")?.getBoundingClientRect()
          .height ?? 0;
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
    if (!loadMoreButton.classList.contains("visually-hidden")) {
      loadMoreButton.classList.add("visually-hidden");
    }
    if (!moreLoader.classList.contains("visually-hidden")) {
      moreLoader.classList.add("visually-hidden");
    }
    if (error instanceof AxiosError) {
      iziToast.error({
        ...TOAST_CONFIG,
        position: "topRight",
        message: `Sorry, error occured: ${error.message}. Please try again!`,
      });

      setTimeout(() => { fetchFrom(searchQuery, perPage, curPage); }, 2000);
    } else {
      console.error(error);
      iziToast.error({
        ...TOAST_CONFIG,
        position: "topRight",
        message: "Sorry, unexpected error occured. Please try again!",
      });
    }
  }
});

// remove load more button visibility if backend returns empty array
export function handleEmptyResponse(data: any) {
  if (!data.hits.length) {
    if (!loadMoreButton.classList.contains("visually-hidden")) {
      loadMoreButton.classList.add("visually-hidden");
    }
  }
}