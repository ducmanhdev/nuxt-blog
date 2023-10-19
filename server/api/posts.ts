import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  // const posts = await prisma.post.findMany({
  //     orderBy: {
  //         created_at: 'desc'
  //     }
  // });
  return null;
});
