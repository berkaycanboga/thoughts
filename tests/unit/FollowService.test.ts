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
    expect(result).toEqual({ message: "User Followed" });
  });

  it("should unfollow a user successfully", async () => {
    const mockUnFollow = { message: "User Unfollowed" };

    mockApi.delete.mockResolvedValueOnce(mockUnFollow);

    const result = await followApiService.unfollowUser(userId);

    expect(mockApi.delete).toHaveBeenCalledWith(urls.follow(followingId));
    expect(result).toEqual({ message: "User Unfollowed" });
  });
});
