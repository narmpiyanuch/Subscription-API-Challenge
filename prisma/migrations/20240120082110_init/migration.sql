/*
  Warnings:

  - Changed the type of `reason` on the `Blacklist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `description` on the `Service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "serviceType" AS ENUM ('PAYMENT', 'MUSIC', 'DELIVERY');

-- CreateEnum
CREATE TYPE "blacklistType" AS ENUM ('BLACKLIST1', 'BLACKLIST2', 'BLACKLIST3');

-- AlterTable
ALTER TABLE "Blacklist" DROP COLUMN "reason",
ADD COLUMN     "reason" "blacklistType" NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "description",
ADD COLUMN     "description" "serviceType" NOT NULL;
