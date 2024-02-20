import { api, urls } from "../../utils/api/api";
import { userApiService } from "../../utils/api/user";

jest.mock("../../utils/api/api");

const mockApi = api as jest.Mocked<typeof api>;

describe("userApiService", () => {
  const userId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get user details successfully", async () => {
    const userData = { id: userId, username: "testuser" };
    mockApi.get.mockResolvedValueOnce(userData);

    const result = await userApiService.getUser(userId);

    expect(mockApi.get).toHaveBeenCalledWith(urls.user(userId));
    expect(result).toEqual(userData);
  });

  it("should get liked posts by user successfully", async () => {
    const likedPosts = [
      { id: 1, content: "Liked post 1" },
      { id: 2, content: "Liked post 2" },
    ];
    mockApi.get.mockResolvedValueOnce(likedPosts);

    const result = await userApiService.getLikedPostsByUserId(userId);

    expect(mockApi.get).toHaveBeenCalledWith(urls.userLikedPosts(userId));
    expect(result).toEqual(likedPosts);
  });

  it("should get posts by user comments successfully", async () => {
    const userCommentedPosts = [
      { id: 3, content: "Commented post 1" },
      { id: 4, content: "Commented post 2" },
    ];
    mockApi.get.mockResolvedValueOnce(userCommentedPosts);

    const result = await userApiService.getPostsByUserComments(userId);

    expect(mockApi.get).toHaveBeenCalledWith(urls.userCommentsPosts(userId));
    expect(result).toEqual(userCommentedPosts);
  });

  // Edge cases

  it("should handle API error when getting user details", async () => {
    const errorMessage = "Failed to get user details";
    mockApi.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(userApiService.getUser(userId)).rejects.toThrow(errorMessage);
  });

  it("should handle API error when getting liked posts by user", async () => {
    const errorMessage = "Failed to get liked posts";
    mockApi.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(userApiService.getLikedPostsByUserId(userId)).rejects.toThrow(
      errorMessage,
    );
  });

  it("should handle API error when getting posts by user comments", async () => {
    const errorMessage = "Failed to get posts by user comments";
    mockApi.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(userApiService.getPostsByUserComments(userId)).rejects.toThrow(
      errorMessage,
    );
  });

  it("should handle empty response when getting user details", async () => {
    mockApi.get.mockResolvedValueOnce(null);

    const result = await userApiService.getUser(userId);

    expect(result).toEqual(null);
  });

  it("should handle empty response when getting liked posts by user", async () => {
    mockApi.get.mockResolvedValueOnce(null);

    const result = await userApiService.getLikedPostsByUserId(userId);

    expect(result).toEqual(null);
  });

  it("should handle empty response when getting posts by user comments", async () => {
    mockApi.get.mockResolvedValueOnce(null);

    const result = await userApiService.getPostsByUserComments(userId);

    expect(result).toEqual(null);
  });
});
