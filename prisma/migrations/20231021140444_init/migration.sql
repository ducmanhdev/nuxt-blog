/*
  Warnings:

  - You are about to drop the column `image` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `imageAlt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Post` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailAlt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "image",
DROP COLUMN "imageAlt",
DROP COLUMN "tag",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "thumbnailAlt" TEXT NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "content" SET NOT NULL;
