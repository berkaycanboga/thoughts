import { api, urls } from "../../utils/api/api";
import { processNewPosts } from "../../utils/api/mainFeed";

jest.mock("../../utils/api/api");

const mockApi = api as jest.Mocked<typeof api>;

describe("processNewPosts", () => {
  const userId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should process new posts successfully", async () => {
    const feed = [
      { id: 1, content: "New post 1" },
      { id: 2, content: "New post 2" },
    ];

    mockApi.get.mockResolvedValueOnce({ feed });

    const result = await processNewPosts(userId);

    expect(mockApi.get).toHaveBeenCalledWith(`${urls.user(userId)}/dashboard`);
    expect(result).toEqual({ newPosts: feed });
  });

  it("should handle invalid response format", async () => {
    const invalidResponse = { data: { invalidField: "Invalid value" } };

    mockApi.get.mockResolvedValueOnce(invalidResponse);

    console.error = jest.fn();

    const result = await processNewPosts(userId);

    expect(mockApi.get).toHaveBeenCalledWith(`${urls.user(userId)}/dashboard`);
    expect(result).toEqual({ newPosts: null });
  });

  it("should handle API error", async () => {
    const errorMessage = "Failed to fetch new posts";
    mockApi.get.mockRejectedValueOnce(new Error(errorMessage));

    const result = await processNewPosts(userId);

    expect(mockApi.get).toHaveBeenCalledWith(`${urls.user(userId)}/dashboard`);
    expect(result).toEqual({ newPosts: null });
  });

  // Edge case

  it("should handle empty response", async () => {
    mockApi.get.mockResolvedValueOnce(null);

    const result = await processNewPosts(userId);

    expect(result).toEqual({ newPosts: null });
  });
});
