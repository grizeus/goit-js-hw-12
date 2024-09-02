import {
  ERR_TOAST_CONFIG,
  handleEmptyResponse,
  validateSearchQuery,
  addVisibility,
  removeVisibility,
  handleError,
  scrollBy,
} from "../ts/helpers.ts";
import { vi, describe, beforeEach, it, expect } from "vitest";
import izitoast from "izitoast";

vi.mock("izitoast");

// Utility function to create a mock HTMLElement
function createMockElement(className: string = ""): HTMLElement {
  const element = document.createElement("div");
  if (className) {
    element.classList.add(className);
  }
  return element;
}

describe("handleEmptyResponse", () => {
  let gallery: HTMLElement,
    topLoader: HTMLElement,
    loadMoreButton: HTMLButtonElement,
    moreLoader: HTMLElement;

  beforeEach(() => {
    gallery = createMockElement();
    topLoader = createMockElement("visually-hidden");
    loadMoreButton = createMockElement() as HTMLButtonElement;
    moreLoader = createMockElement();
  });

  it("should clear gallery, hide topLoader, and show error toast if totalHits is 0", () => {
    const data = { totalHits: 0, hits: [] };

    handleEmptyResponse(data, gallery, topLoader, loadMoreButton, moreLoader);

    expect(gallery.innerHTML).toBe("");
    expect(topLoader.classList.contains("visually-hidden")).toBe(true); // it should remove 'visually-hidden'
    expect(izitoast.default.error).toHaveBeenCalledWith({
      ...ERR_TOAST_CONFIG,
      message:
        "Sorry, there are no images matching your search query. Please try again!",
    });
  });

  it("should hide loadMoreButton and moreLoader if hits is empty", () => {
    const data = { totalHits: 10, hits: [] };

    handleEmptyResponse(data, gallery, topLoader, loadMoreButton, moreLoader);

    expect(loadMoreButton.classList.contains("visually-hidden")).toBe(true);
    expect(moreLoader.classList.contains("visually-hidden")).toBe(true);
  });
});

describe("validateSearchQuery", () => {
  let gallery: HTMLUListElement,
    loadBtn: HTMLButtonElement,
    topLoader: HTMLSpanElement;

  beforeEach(() => {
    gallery = createMockElement() as HTMLUListElement;
    loadBtn = createMockElement() as HTMLButtonElement;
    topLoader = createMockElement("visually-hidden") as HTMLSpanElement;
  });

  it("should return false and clear gallery if query is empty", () => {
    const result = validateSearchQuery("", gallery, loadBtn, topLoader);

    expect(result).toBe(false);
    expect(gallery.innerHTML).toBe("");
    expect(loadBtn.classList.contains("visually-hidden")).toBe(true);
  });

  it("should return true and show topLoader if query is valid", () => {
    const result = validateSearchQuery(
      "valid query",
      gallery,
      loadBtn,
      topLoader
    );

    expect(result).toBe(true);
    expect(gallery.innerHTML).toBe("");
    expect(topLoader.classList.contains("visually-hidden")).toBe(false);
  });
});

describe("Visibility functions", () => {
  it("addVisibility should remove visually-hidden class", () => {
    const element = createMockElement("visually-hidden");

    addVisibility(element);

    expect(element.classList.contains("visually-hidden")).toBe(false);
  });

  it("removeVisibility should add visually-hidden class", () => {
    const element = createMockElement();

    removeVisibility(element);

    expect(element.classList.contains("visually-hidden")).toBe(true);
  });
});

describe("handleError", () => {
  let loadMoreButton: HTMLButtonElement,
    topLoader: HTMLSpanElement,
    moreLoader: HTMLSpanElement;

  beforeEach(() => {
    loadMoreButton = createMockElement() as HTMLButtonElement;
    topLoader = createMockElement() as HTMLSpanElement;
    moreLoader = createMockElement() as HTMLSpanElement;
  });

  it("should hide all loaders and show Axios error toast", () => {
    const error = new Error("Test error");

    handleError(error, loadMoreButton, topLoader, moreLoader);

    expect(loadMoreButton.classList.contains("visually-hidden")).toBe(true);
    expect(topLoader.classList.contains("visually-hidden")).toBe(true);
    expect(moreLoader.classList.contains("visually-hidden")).toBe(true);
    expect(izitoast.default.error).toHaveBeenCalledWith({
      ...ERR_TOAST_CONFIG,
      message: "Sorry, unexpected error occurred. Please try again!",
    });
  });
});

describe("scrollBy", () => {
  it("should scroll the window by twice the gallery card height", () => {
    const galleryCardHeight = 100;
    window.scrollBy = vi.fn();

    scrollBy(galleryCardHeight);

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: galleryCardHeight * 2,
      behavior: "smooth",
    });
  });
});
