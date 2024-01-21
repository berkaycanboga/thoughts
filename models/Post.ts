import { User } from "./User";

export interface Post {
  content: string;
  author?: User;
  authorId: number;
}
