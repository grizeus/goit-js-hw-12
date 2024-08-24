import fetchFrom from './js/pixabay-api.js';

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
    }
});
