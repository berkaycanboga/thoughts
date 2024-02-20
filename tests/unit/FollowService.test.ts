import { api, urls } from "../../utils/api/api";
import { followApiService } from "../../utils/api/follow";

jest.mock("../../utils/api/api");

const mockApi = api as jest.Mocked<typeof api>;

describe("followApiService", () => {
  const userId = 123;
  const followingId = 456;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get followers by user ID successfully", async () => {
    const mockFollowers = [{ userId: 789 }, { userId: 987 }];
    mockApi.get.mockResolvedValueOnce(mockFollowers);

    const result = await followApiService.getFollowersByUserId(followingId);

    expect(mockApi.get).toHaveBeenCalledWith(urls.follower(followingId));
    expect(result).toEqual(mockFollowers);
  });

  it("should get following by user ID successfully", async () => {
    const mockFollowing = [{ userId: 789 }, { userId: 987 }];
    mockApi.get.mockResolvedValueOnce(mockFollowing);

    const result = await followApiService.getFollowingByUserId(userId);

    expect(mockApi.get).toHaveBeenCalledWith(urls.following(userId));
    expect(result).toEqual(mockFollowing);
  });

  it("should follow a user successfully", async () => {
    const mockFollow = { message: "User Followed" };
    mockApi.post.mockResolvedValueOnce(mockFollow);

    const result = await followApiService.followUser(userId);

    expect(mockApi.post).toHaveBeenCalledWith(urls.follow(followingId));
    expect(result).toEqual(mockFollow);
  });

  it("should unfollow a user successfully", async () => {
    const mockUnFollow = { message: "User Unfollowed" };

    mockApi.delete.mockResolvedValueOnce(mockUnFollow);

    const result = await followApiService.unfollowUser(userId);

    expect(mockApi.delete).toHaveBeenCalledWith(urls.follow(followingId));
    expect(result).toEqual(mockUnFollow);
  });

  // Edge cases
  it("should handle API error when getting followers by user ID", async () => {
    const errorMessage = "Failed to get followers";
    mockApi.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(
      followApiService.getFollowersByUserId(followingId),
    ).rejects.toThrow(errorMessage);
  });

  it("should handle empty response when getting following by user ID", async () => {
    mockApi.get.mockResolvedValueOnce(null);

    const result = await followApiService.getFollowingByUserId(userId);

    expect(result).toEqual(null);
  });

  it("should handle API error when following a user", async () => {
    const errorMessage = "Failed to follow user";
    mockApi.post.mockRejectedValueOnce(new Error(errorMessage));

    await expect(followApiService.followUser(userId)).rejects.toThrow(
      errorMessage,
    );
  });

  it("should handle API error when unfollowing a user", async () => {
    const errorMessage = "Failed to unfollow user";
    mockApi.delete.mockRejectedValueOnce(new Error(errorMessage));

    await expect(followApiService.unfollowUser(userId)).rejects.toThrow(
      errorMessage,
    );
  });
});
