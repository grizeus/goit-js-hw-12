"use strict";

import fetchFrom from './js/pixabay-api.js';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import "./css/custom-izitoast.css";
import errSvg from './img/error.svg';

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const searchQuery = searchInput.value;
    if (searchQuery === "") {
        return;
    }
    const res = await fetchFrom(searchQuery);
    if (parseInt(res.totalHits) > 0) {
        console.log(res);
    } else {
        console.log(
          "Sorry, there are no images matching your search query. Please try again!"
        );
        iziToast.error({
            titleSize: "16px",
            message: "Sorry, there are no images matching your search query. Please try again!",
            maxWidth: "432px",
            position: "topRight",
            closeOnEscape: true,
            icon: "error",
            iconUrl: errSvg,
            theme: "dark",
        });
    }
});
