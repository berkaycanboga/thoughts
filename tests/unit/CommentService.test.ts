import { CommentProps } from "../../models/Comment";
import { api, urls } from "../../utils/api/api";
import { commentsApiService } from "../../utils/api/comment";

jest.mock("../../utils/api/api");

const mockApi = api as jest.Mocked<typeof api>;

const mockComment: CommentProps = {
  id: 1,
  content: "Test comment",
  createdAt: new Date(),
  userId: 2,
  postId: 1,
  user: {
    id: 0,
    username: "TestUser",
    fullName: "Test User",
    email: "testuser@example.com",
    password: "Testpassword123*",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

describe("commentsApiService", () => {
  const userId = 123;
  const postId = 456;
  const commentId = 789;
  const content = "Test comment content";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a comment successfully", async () => {
    mockApi.post.mockResolvedValueOnce(mockComment);

    const result = await commentsApiService.createComment(
      userId,
      postId,
      content,
    );

    expect(mockApi.post).toHaveBeenCalledWith(
      urls.postComments(userId, postId),
      {
        content,
      },
    );
    expect(result).toEqual(mockComment);
  });

  it("should get a single comment by post Id successfully", async () => {
    mockApi.get.mockResolvedValueOnce([mockComment]);

    const result = await commentsApiService.getCommentByPostId(
      commentId,
      postId,
    );

    expect(mockApi.get).toHaveBeenCalledWith(
      urls.postComments(postId, commentId),
    );
    expect(result).toEqual([mockComment]);
  });

  it("should get all comments by post Id successfully", async () => {
    const comments = [mockComment, mockComment];
    mockApi.get.mockResolvedValueOnce(comments);

    const result = await commentsApiService.getCommentsByPostId(userId, postId);

    expect(mockApi.get).toHaveBeenCalledWith(urls.postComments(userId, postId));
    expect(result).toEqual(comments);
  });

  it("should delete a comment successfully", async () => {
    mockApi.delete.mockResolvedValueOnce(mockComment);

    const result = await commentsApiService.deleteComment(
      userId,
      postId,
      commentId,
    );

    expect(mockApi.delete).toHaveBeenCalledWith(
      urls.postComments(userId, postId, commentId),
    );
    expect(result).toEqual(mockComment);
  });

  // Edge cases
  it("should handle API error when creating a comment", async () => {
    const errorMessage = "Failed to create comment";
    mockApi.post.mockRejectedValueOnce(new Error(errorMessage));

    await expect(
      commentsApiService.createComment(userId, postId, content),
    ).rejects.toThrow(errorMessage);
  });

  it("should handle empty response when getting comments by post Id", async () => {
    mockApi.get.mockResolvedValueOnce(null);

    const result = await commentsApiService.getCommentsByPostId(userId, postId);

    expect(result).toEqual(null);
  });

  it("should handle non-numeric comment ID when getting a single comment by post Id", async () => {
    const nonNumericCommentId = "abc";
    const error = new Error("Invalid comment ID");

    mockApi.get.mockRejectedValueOnce(error);

    await expect(
      commentsApiService.getCommentByPostId(
        // @ts-expect-error: This is an intentional edge case where a string is passed instead of a number.
        nonNumericCommentId,
        postId,
      ),
    ).rejects.toThrow("Invalid comment ID");
  });

  it("should handle API error when deleting a comment", async () => {
    const errorMessage = "Failed to delete comment";
    mockApi.delete.mockRejectedValueOnce(new Error(errorMessage));

    await expect(
      commentsApiService.deleteComment(userId, postId, commentId),
    ).rejects.toThrow(errorMessage);
  });

  it("should handle non-numeric comment ID when deleting a comment", async () => {
    const nonNumericCommentId = "xyz";
    const error = new Error("Invalid comment ID");

    mockApi.delete.mockRejectedValueOnce(error);

    await expect(
      commentsApiService.deleteComment(
        userId,
        postId,
        // @ts-expect-error: This is an intentional edge case where a string is passed instead of a number.
        nonNumericCommentId,
      ),
    ).rejects.toThrow("Invalid comment ID");
  });
});
