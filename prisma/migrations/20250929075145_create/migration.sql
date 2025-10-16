-- CreateTable
CREATE TABLE "public"."EmailVerification" (
    "userId" INTEGER NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_token_hash" TEXT,
    "token_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token_expires_at" TIMESTAMP(3) NOT NULL,
    "token_used_at" TIMESTAMP(3),

    CONSTRAINT "EmailVerification_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "public"."EmailVerification" ADD CONSTRAINT "EmailVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
