import { User } from "./User";

export interface Comment {
  id?: number;
  content: string;
  createdAt?: Date;
  user?: User;
  userId: number;
  postId: number;
}

export interface CommentCRUD {
  content: string;
  createdAt?: Date;
  userId: number;
  postId: number;
}
