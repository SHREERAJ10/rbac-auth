-- CreateTable
CREATE TABLE "public"."PasswordReset" (
    "userId" INTEGER NOT NULL,
    "reset_token_hash" TEXT NOT NULL,
    "token_created_at" TIMESTAMP(3) NOT NULL,
    "token_expires_at" TIMESTAMP(3) NOT NULL,
    "token_used_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "public"."PasswordReset" ADD CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
