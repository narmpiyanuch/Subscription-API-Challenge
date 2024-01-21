/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `Blacklist` table. All the data in the column will be lost.
  - Added the required column `msisdn` to the `Blacklist` table without a default value. This is not possible if the table is not empty.
  - Made the column `reason` on table `Blacklist` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Blacklist" DROP CONSTRAINT "Blacklist_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "Blacklist" DROP COLUMN "subscriptionId",
ADD COLUMN     "msisdn" TEXT NOT NULL,
ALTER COLUMN "reason" SET NOT NULL;
