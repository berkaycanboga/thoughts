import type { Prisma } from "@prisma/client";

import { User } from "./User";

export type PostProps = Prisma.PostGetPayload<{
  include: { author: true; comment: { include: { user: true } } };
}>;

export interface PostCRUD {
  content: string;
  author?: User;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
  isPlaceholder?: boolean;
}
