/*
  Warnings:

  - The `reason` column on the `Blacklist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `description` on the `Service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Blacklist" DROP COLUMN "reason",
ADD COLUMN     "reason" TEXT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "description",
ADD COLUMN     "description" TEXT NOT NULL;

-- DropEnum
DROP TYPE "blacklistType";

-- DropEnum
DROP TYPE "serviceType";
