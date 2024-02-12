import { Comment } from "./Comment";
import { Post } from "./Post";
import { User } from "./User";

export interface Like {
  id: number;
  user: User;
  post?: Post;
  comment?: Comment;
}

export interface LikeItemProps {
  userId: number;
  postId: number;
  commentId?: number;
}
