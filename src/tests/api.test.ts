import axios from "axios";
import "dotenv/config";
import fetchFrom from "../ts/pixabay-api";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://pixabay.com/api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.defaults.baseURL = BASE_URL;

describe("fetchFrom function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios with correct default params", async () => {
    const query = "test";
    await fetchFrom(query);

    expect(mockedAxios.get).toHaveBeenCalledWith("/", {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 15,
        page: 1,
      },
    });
  });

  it("should use provided perPage and curPage params", async () => {
    const query = "test";
    const perPage = 9;
    const curPage = 2;
    await fetchFrom(query, perPage, curPage);

    expect(mockedAxios.get).toHaveBeenCalledWith("/", {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: perPage,
        page: curPage,
      },
    });
  });

  it("should use default perPage when provided value is less than 1", async () => {
    const query = "test";
    const perPage = 0;
    await fetchFrom(query, perPage);

    expect(mockedAxios.get).toHaveBeenCalledWith("/", {
      params: expect.objectContaining({
        per_page: 15,
      }),
    });
  });

  it("should return the correct response", async () => {
    const mockResponse = { data: "test data" };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const res = await fetchFrom("test");
    expect(res).toBe(mockResponse);
  });

  it("should throw an error if axios.get fails", async () => {
    const errorMsg = "Network Error";
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMsg))
    );

    await expect(fetchFrom("test")).rejects.toThrow(errorMsg);
  });

  it("should use the correct base URL", async () => {
    await fetchFrom("test");
    expect(mockedAxios.defaults.baseURL).toBe(BASE_URL);
  });
});
