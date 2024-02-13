import prisma from "../utils/prisma";

export const getUserIdByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
    },
  });

  return user?.id;
};
