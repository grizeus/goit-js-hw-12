interface Picture {
  webformatURL: string;
  largeImageURL: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  downloads: number;
}

interface FetchData {
  hits: Picture[];
}

export default function renderGallery(fetchData: FetchData) {
  const galleryMarkup = fetchData.hits
    .map((picture: Picture) => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = picture;
      return `
        <li class="gallery-item">
            <a href="${largeImageURL}" target="_blank">
                <div class="img-wrapper">
                  <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
                </div>
            </a>
            <ul class="gallery-item-info">
                <li class="gallery-item-likes"><b>Likes</b> ${likes}</li>
                <li class="gallery-item-views"><b>Views</b> ${views}</li>
                <li class="gallery-item-comments"><b>Comments</b> ${comments}</li>
                <li class="gallery-item-downloads"><b>Downloads</b> ${downloads}</li>
            </ul>
        </li>
        `;
    })
    .join("");

  return galleryMarkup;
}
