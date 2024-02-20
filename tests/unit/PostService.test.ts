import type { Prisma } from "@prisma/client";

import { api, urls } from "../../utils/api/api";
import { postsApiService } from "../../utils/api/post";

jest.mock("../../utils/api/api");

const mockApi = api as jest.Mocked<typeof api>;

type PostProps = Prisma.PostGetPayload<{
  include?: { author?: true; comment?: { include?: { user?: true } } };
}>;

const mockPostProps: PostProps = {
  id: 1,
  content: "Test post content",
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: 0,
};

describe("postsApiService", () => {
  const userId = 123;
  const postId = 456;
  const content = "Test post content";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a post successfully", async () => {
    mockApi.post.mockResolvedValueOnce(mockPostProps);

    const result = await postsApiService.createPost(userId, content);

    expect(mockApi.post).toHaveBeenCalledWith(urls.userPosts(userId), {
      content,
    });
    expect(result).toEqual(mockPostProps);
  });

  it("should get a post successfully", async () => {
    mockApi.get.mockResolvedValueOnce(mockPostProps);

    const result = await postsApiService.getPost(userId, postId);

    expect(mockApi.get).toHaveBeenCalledWith(urls.userPosts(userId, postId));
    expect(result).toEqual(mockPostProps);
  });

  it("should get user posts successfully", async () => {
    const userPosts = [mockPostProps, mockPostProps];
    mockApi.get.mockResolvedValueOnce(userPosts);

    const result = await postsApiService.getUserPosts(userId);

    expect(mockApi.get).toHaveBeenCalledWith(urls.userPosts(userId));
    expect(result).toEqual(userPosts);
  });

  it("should update a post successfully", async () => {
    mockApi.put.mockResolvedValueOnce(mockPostProps);

    const result = await postsApiService.updatePost(userId, postId, content);

    expect(mockApi.put).toHaveBeenCalledWith(urls.userPosts(userId, postId), {
      content,
    });
    expect(result).toEqual(mockPostProps);
  });

  it("should delete a post successfully", async () => {
    mockApi.delete.mockResolvedValueOnce(mockPostProps);

    const result = await postsApiService.deletePost(userId, postId);

    expect(mockApi.delete).toHaveBeenCalledWith(urls.userPosts(userId, postId));
    expect(result).toEqual(mockPostProps);
  });
});
