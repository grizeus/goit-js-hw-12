import fetchFrom from './js/pixabay-api.js';

const res = await fetchFrom("covfefe");
if (parseInt(res.totalHits) > 0) {
    console.log(res.hits);
    console.log(res.hits[0].previewURL);
    console.log(res.hits[0].largeImageURL);
} else {
    console.log(
      "Sorry, there are no images matching your search query. Please try again!"
    );
}