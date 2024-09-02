import iziToast, { IziToastSettings } from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "../css/custom-izitoast.css";
import { AxiosError } from "axios";
import errSvg from "../img/error.svg";

export const TOAST_CONFIG: IziToastSettings = {
  titleSize: "16px",
  maxWidth: 432,
  position: "topRight",
  closeOnEscape: true,
  theme: "dark",
};

export const ERR_TOAST_CONFIG: IziToastSettings = {
  ...TOAST_CONFIG,
  icon: "error",
  iconUrl: errSvg,
};

export function handleEmptyResponse(
  data: any,
  gallery: HTMLElement,
  topLoader: HTMLElement,
  loadMoreButton: HTMLButtonElement,
  moreLoader: HTMLElement
): void {
  if (!data.totalHits) {
    gallery.innerHTML = "";
    removeVisibility(topLoader);
    iziToast.default.error({
      ...ERR_TOAST_CONFIG,
      message:
        "Sorry, there are no images matching your search query. Please try again!",
    });
    return;
  }

  if (!data.hits.length) {
    removeVisibility(loadMoreButton);
    removeVisibility(moreLoader);
  }
}

export function validateSearchQuery(
  query: string,
  gallery: HTMLUListElement,
  loadBtn: HTMLButtonElement,
  topLoader: HTMLSpanElement
): boolean {

  if (query === "") {
    gallery.innerHTML = "";
    removeVisibility(loadBtn);
    return false;
  }

  gallery.innerHTML = "";
  addVisibility(topLoader);

  return true;
}

export function addVisibility(element: HTMLElement): void {
  if (element.classList.contains("visually-hidden")) {
    element.classList.remove("visually-hidden");
  } else {
    return;
  }
}

export function removeVisibility(element: HTMLElement): void {
  if (!element.classList.contains("visually-hidden")) {
    element.classList.add("visually-hidden");
  } else {
    return;
  }
}

export function handleError(
  error: any,
  loadMoreButton: HTMLButtonElement,
  topLoader: HTMLSpanElement,
  moreLoader: HTMLSpanElement
): void {
  removeVisibility(loadMoreButton);
  removeVisibility(topLoader);
  removeVisibility(moreLoader);

  if (error instanceof AxiosError) {
    console.error("Axios Error:", error.message);
    console.error("Error Details:", error.config);
    iziToast.default.error({
      ...ERR_TOAST_CONFIG,
      message: `Sorry, error occurred: ${error.message}. Please try again!`,
    });
  } else {
    console.error(error);
    iziToast.default.error({
      ...ERR_TOAST_CONFIG,
      message: "Sorry, unexpected error occurred. Please try again!",
    });
  }
}

export function scrollBy(galleryCardHeight: number): void {
  if (galleryCardHeight === 0) {
    galleryCardHeight =
      document.querySelector(".gallery-item")?.getBoundingClientRect().height ??
      0;
  }

  window.scrollBy({
    top: galleryCardHeight * 2,
    behavior: "smooth",
  });
}
