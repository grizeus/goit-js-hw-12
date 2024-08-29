declare module 'simplelightbox' {
  export default class SimpleLightbox {
    constructor(elements: string | NodeList, options?: SimpleLightboxOptions);
    open(): void;
    close(): void;
    next(): void;
    prev(): void;
    destroy(): void;
    refresh(): void;
  }

  interface SimpleLightboxOptions {
    sourceAttr?: string;
    overlay?: boolean;
    spinner?: boolean;
    nav?: boolean;
    navText?: [string, string];
    captions?: boolean;
    captionDelay?: number;
    captionSelector?: string;
    captionType?: 'data' | 'text' | 'html';
    captionsData?: string;
    captionPosition?: 'bottom' | 'top';
    captionClass?: string;
    close?: boolean;
    closeText?: string;
    swipeClose?: boolean;
    showCounter?: boolean;
    fileExt?: string;
    animationSlide?: boolean;
    animationSpeed?: number;
    preloading?: boolean;
    enableKeyboard?: boolean;
    loop?: boolean;
    rel?: string;
    docClose?: boolean;
    swipeTolerance?: number;
    className?: string;
    widthRatio?: number;
    heightRatio?: number;
    scaleImageToRatio?: boolean;
    disableScroll?: boolean;
    disableRightClick?: boolean;
    alertError?: boolean;
    alertErrorMessage?: string;
    additionalHtml?: string;
    history?: boolean;
    throttleInterval?: number;
    doubleTapZoom?: number;
    maxZoom?: number;
    htmlClass?: string;
    rtl?: boolean;
    fixedClass?: string;
    fadeSpeed?: number;
    uniqueImages?: boolean;
    focus?: boolean;
  }
}