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

  // Edge cases
  it("should handle API error when creating a post", async () => {
    const errorMessage = "Failed to create post";
    mockApi.post.mockRejectedValueOnce(new Error(errorMessage));

    await expect(postsApiService.createPost(userId, content)).rejects.toThrow(
      errorMessage,
    );
  });

  it("should handle empty response when getting user posts", async () => {
    mockApi.get.mockResolvedValueOnce(null);

    const result = await postsApiService.getUserPosts(userId);

    expect(result).toEqual(null);
  });

  it("should handle non-numeric post ID when getting a post", async () => {
    const nonNumericPostId = "abc";
    const error = new Error("Invalid post ID");

    mockApi.get.mockRejectedValueOnce(error);

    await expect(
      postsApiService.getPost(
        userId,
        // @ts-expect-error: This is an intentional edge case where a string is passed instead of a number.
        nonNumericPostId,
      ),
    ).rejects.toThrow("Invalid post ID");
  });

  it("should handle API error when updating a post", async () => {
    const errorMessage = "Failed to update post";
    mockApi.put.mockRejectedValueOnce(new Error(errorMessage));

    await expect(
      postsApiService.updatePost(userId, postId, content),
    ).rejects.toThrow(errorMessage);
  });

  it("should handle API error when deleting a post", async () => {
    const errorMessage = "Failed to delete post";
    mockApi.delete.mockRejectedValueOnce(new Error(errorMessage));

    await expect(postsApiService.deletePost(userId, postId)).rejects.toThrow(
      errorMessage,
    );
  });

  it("should handle non-numeric post ID when deleting a post", async () => {
    const nonNumericPostId = "xyz";
    const error = new Error("Invalid post ID");

    mockApi.delete.mockRejectedValueOnce(error);

    await expect(
      postsApiService.deletePost(
        userId,
        // @ts-expect-error: This is an intentional edge case where a string is passed instead of a number.
        nonNumericPostId,
      ),
    ).rejects.toThrow("Invalid post ID");
  });
});
