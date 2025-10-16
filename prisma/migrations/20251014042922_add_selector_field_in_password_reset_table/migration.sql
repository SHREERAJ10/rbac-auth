/*
  Warnings:

  - Added the required column `selector` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PasswordReset" ADD COLUMN     "selector" TEXT NOT NULL;
