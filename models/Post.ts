import { User } from "./User";

export interface Post {
  id?: number;
  content: string;
  author?: User;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
  isPlaceholder?: boolean;
}
