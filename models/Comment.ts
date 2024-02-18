import { Prisma } from "@prisma/client";

export type CommentProps = Prisma.CommentGetPayload<{
  include: { user?: true };
}>;

export interface CommentCRUD {
  content: string;
  createdAt?: Date;
  userId: number;
  postId: number;
}
