import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

export interface Post {
  id?: number;
  content: string;
  author?: User;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  comment: Comment[];
  like: Like[];
  isPlaceholder?: boolean;
}

export interface PostCRUD {
  content: string;
  author?: User;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  isPlaceholder?: boolean;
}
