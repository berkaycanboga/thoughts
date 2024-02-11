import prisma from "../utils/prisma";

export const searchPosts = async (searchTerm: string) => {
  const posts = await prisma.post.findMany({
    where: {
      OR: [{ content: { contains: searchTerm } }],
    },
  });
  return posts;
};

export const searchUsers = async (searchTerm: string) => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: searchTerm } },
        { fullName: { contains: searchTerm } },
      ],
    },
  });
  return users;
};
