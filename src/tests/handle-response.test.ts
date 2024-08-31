import { handleEmptyResponse, ResponseData } from "../main";

describe("handleEmptyResponse", () => {
  let loadMoreButton: HTMLButtonElement;

  beforeEach(() => {
    // Create a mock button element with a class list
    loadMoreButton = document.createElement("button");
    loadMoreButton.id = "loadMoreButton";
    loadMoreButton.classList.add("load-more"); // Initial class, could be anything

    // Append to the document body or mock as needed
    document.body.appendChild(loadMoreButton);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(loadMoreButton);
  });

  it('should add "visually-hidden" class to loadMoreButton when data.hits is empty', () => {
    const mockData = { total: 0, totalHits: 0, hits: [] }; // Mock empty response

    handleEmptyResponse(mockData);

    expect(loadMoreButton.classList.contains("visually-hidden")).toBe(true);
  });

  it('should not add "visually-hidden" class to loadMoreButton when data.hits is not empty', () => {
    const mockData: ResponseData = {total : 42, totalHits : 2,  hits: [{ id : 1 }, { id : 2 }] }; // Mock non-empty response

    handleEmptyResponse(mockData);

    expect(loadMoreButton.classList.contains("visually-hidden")).toBe(false);
  });
});
