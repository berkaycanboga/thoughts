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
});
