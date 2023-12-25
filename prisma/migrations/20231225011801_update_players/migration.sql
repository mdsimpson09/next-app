/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "emailVerified",
ADD COLUMN     "bio" VARCHAR(500),
ADD COLUMN     "looking_for" VARCHAR(500);
