import { api, urls } from "../../utils/api/api";
import { likesApiService } from "../../utils/api/like";

jest.mock("../../utils/api/api");

const mockApi = api as jest.Mocked<typeof api>;

describe("likesApiService", () => {
  const userId = 123;
  const postId = 456;
  const commentId = 789;
  const likeId = 987;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Post Likes", () => {
    it("should create a post like successfully", async () => {
      mockApi.post.mockResolvedValueOnce({});

      await likesApiService.createPostLike(userId, postId);

      expect(mockApi.post).toHaveBeenCalledWith(urls.postLikes(userId, postId));
    });

    it("should get a post like successfully", async () => {
      mockApi.get.mockResolvedValueOnce({});

      await likesApiService.getPostLike(userId, postId, likeId);

      expect(mockApi.get).toHaveBeenCalledWith(
        urls.postLikes(userId, postId, likeId),
      );
    });

    it("should get post likes successfully", async () => {
      mockApi.get.mockResolvedValueOnce([]);

      await likesApiService.getPostLikes(userId, postId);

      expect(mockApi.get).toHaveBeenCalledWith(urls.postLikes(userId, postId));
    });

    it("should delete a post like successfully", async () => {
      mockApi.delete.mockResolvedValueOnce({});

      await likesApiService.deletePostLike(userId, postId, likeId);

      expect(mockApi.delete).toHaveBeenCalledWith(
        urls.postLikes(userId, postId, likeId),
      );
    });

    // Edge cases for Post Likes
    it("should handle API error when creating a post like", async () => {
      mockApi.post.mockRejectedValueOnce(new Error("API Error"));

      await expect(
        likesApiService.createPostLike(userId, postId),
      ).rejects.toThrow("API Error");
    });

    it("should handle empty response when getting post likes", async () => {
      mockApi.get.mockResolvedValueOnce(null);

      const result = await likesApiService.getPostLikes(userId, postId);

      expect(result).toEqual(null);
    });

    it("should handle non-numeric post ID when deleting a post like", async () => {
      const nonNumericPostId = "abc";
      const error = new Error("Invalid post ID");

      mockApi.delete.mockRejectedValueOnce(error);

      await expect(
        likesApiService.deletePostLike(
          userId,
          // @ts-expect-error: This is an intentional edge case where a string is passed instead of a number.
          nonNumericPostId,
          likeId,
        ),
      ).rejects.toMatchObject({
        message: "Invalid post ID",
      });
    });

    it("should handle non-existent post when deleting a post like", async () => {
      const nonExistentPostId = 999;
      const errorMessage = "Post not found";

      mockApi.delete.mockRejectedValueOnce({
        response: {
          status: 404,
          data: { error: errorMessage },
        },
      });

      await expect(
        likesApiService.deletePostLike(userId, nonExistentPostId, likeId),
      ).rejects.toMatchObject({
        response: {
          status: 404,
          data: { error: errorMessage },
        },
      });
    });
  });

  describe("Comment Likes", () => {
    it("should create a comment like successfully", async () => {
      mockApi.post.mockResolvedValueOnce({});

      await likesApiService.createCommentLike(userId, postId, commentId);

      expect(mockApi.post).toHaveBeenCalledWith(
        urls.commentLikes(userId, postId, commentId),
      );
    });

    it("should get a comment like successfully", async () => {
      mockApi.get.mockResolvedValueOnce({});

      await likesApiService.getCommentLike(userId, postId, commentId, likeId);

      expect(mockApi.get).toHaveBeenCalledWith(
        urls.commentLikes(userId, postId, commentId, likeId),
      );
    });

    it("should get comment likes successfully", async () => {
      mockApi.get.mockResolvedValueOnce([]);

      await likesApiService.getCommentLikes(userId, postId, commentId);

      expect(mockApi.get).toHaveBeenCalledWith(
        urls.commentLikes(userId, postId, commentId),
      );
    });

    it("should delete a comment like successfully", async () => {
      mockApi.delete.mockResolvedValueOnce({});

      await likesApiService.deleteCommentLike(
        userId,
        postId,
        commentId,
        likeId,
      );

      expect(mockApi.delete).toHaveBeenCalledWith(
        urls.commentLikes(userId, postId, commentId, likeId),
      );
    });

    // Edge cases for Comment Likes
    it("should handle non-existent post when creating a comment like", async () => {
      const nonExistentPostId = 999;
      const errorMessage = "Post not found";

      mockApi.post.mockRejectedValueOnce({
        response: {
          status: 404,
          data: { error: errorMessage },
        },
      });

      await expect(
        likesApiService.createCommentLike(userId, nonExistentPostId, commentId),
      ).rejects.toMatchObject({
        response: {
          status: 404,
          data: { error: errorMessage },
        },
      });
    });

    it("should handle non-numeric comment ID when deleting a comment like", async () => {
      const nonNumericCommentId = "xyz";
      const error = new Error("Invalid comment ID");

      mockApi.delete.mockRejectedValueOnce(error);

      await expect(
        likesApiService.deleteCommentLike(
          userId,
          postId,
          // @ts-expect-error: This is an intentional edge case where a string is passed instead of a number.
          nonNumericCommentId,
          likeId,
        ),
      ).rejects.toMatchObject({
        message: "Invalid comment ID",
      });
    });
  });
});
