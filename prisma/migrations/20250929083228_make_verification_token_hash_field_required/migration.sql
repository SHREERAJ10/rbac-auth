/*
  Warnings:

  - Made the column `verification_token_hash` on table `EmailVerification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."EmailVerification" ALTER COLUMN "verification_token_hash" SET NOT NULL;
