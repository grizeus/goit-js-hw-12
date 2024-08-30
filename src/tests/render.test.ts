import renderGallery, { Picture } from "../ts/render-functions";
import he from "he";

describe("renderGallery", () => {
  const mockPicture: Picture = {
    webformatURL: "https://example.com/small.jpg",
    largeImageURL: "https://example.com/large.jpg",
    tags: "nature, landscape",
    likes: 100,
    views: 1000,
    comments: 50,
    downloads: 200,
  };

  it("should return an empty string for empty hits array", () => {
    const result = renderGallery({ hits: [] });
    expect(result).toBe("");
  });

  it("should render a single picture correctly", () => {
    const result = renderGallery({ hits: [mockPicture] });
    expect(result).toContain('<li class="gallery-item">');
    expect(result).toContain(
      `<img class="gallery-image" src="${he.encode(
        mockPicture.webformatURL
      )}" alt="${he.encode(mockPicture.tags)}" />`
    );
    expect(result).toContain(
      `<li class="gallery-item-likes"><b>Likes</b> ${mockPicture.likes}</li>`
    );
    expect(result).toContain(
      `<li class="gallery-item-views"><b>Views</b> ${mockPicture.views}</li>`
    );
    expect(result).toContain(
      `<li class="gallery-item-comments"><b>Comments</b> ${mockPicture.comments}</li>`
    );
    expect(result).toContain(
      `<li class="gallery-item-downloads"><b>Downloads</b> ${mockPicture.downloads}</li>`
    );
  });

  it("should render multiple pictures correctly", () => {
    const mockData = {
      hits: [
        mockPicture,
        { ...mockPicture, webformatURL: "https://example.com/small2.jpg" },
      ],
    };
    const result = renderGallery(mockData);
    console.log(typeof result);
    expect(result.split('<li class="gallery-item">').length).toBe(3); // 2 items + 1 for split
  });

  it("should handle pictures with missing properties", () => {
    const incompletePicture = {
      ...mockPicture,
      likes: undefined,
      comments: undefined,
    };
    const result = renderGallery({ hits: [incompletePicture] });
    expect(result).toContain(
      '<li class="gallery-item-likes"><b>Likes</b> undefined</li>'
    );
    expect(result).toContain(
      '<li class="gallery-item-comments"><b>Comments</b> undefined</li>'
    );
  });

  it("should escape HTML in tags", () => {
    const pictureWithHtmlTags = {
      ...mockPicture,
      tags: '<script>alert("xss")</script>',
    };
    const result = renderGallery({ hits: [pictureWithHtmlTags] });
    expect(result).not.toContain("<script>");
    expect(result).toContain(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
    );
  });

  it("should handle tags as an array and escape HTML in tags and URLs", () => {
    const pictureWithHtmlTags = {
      ...mockPicture,
      tags: "<script>alert('xss')</script>, nature",
      webformatURL: "https://example.com/small.jpg?param=<script>",
      largeImageURL: "https://example.com/large.jpg?param=<script>",
    };
    const result = renderGallery({ hits: [pictureWithHtmlTags] });
    expect(result).not.toContain("<script>");
    expect(result).toContain(
      he.escape("<script>alert('xss')</script>, nature")
    );
    expect(result).toContain(
      he.escape("https://example.com/small.jpg?param=<script>")
    );
    expect(result).toContain(
      he.escape("https://example.com/large.jpg?param=<script>")
    );
  });

  it("should join multiple tags correctly", () => {
    const pictureWithMultipleTags = {
      ...mockPicture,
      tags: "nature, landscape, summer",
    };
    const result = renderGallery({ hits: [pictureWithMultipleTags] });
    expect(result).toContain('alt="nature, landscape, summer"');
  });
});
