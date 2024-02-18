import { CommentProps } from "./Comment";
import { PostProps } from "./Post";
import { User } from "./User";

export interface Like {
  id: number;
  user: User;
  post?: PostProps;
  comment?: CommentProps;
}

export interface LikeItemProps {
  userId: number;
  postId: number;
  commentId?: number;
}
