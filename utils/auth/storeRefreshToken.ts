import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function storeRefreshToken(userID: number, refreshToken: string) {
  const salt = await bcrypt.genSalt(10);
  const refreshTokenHash = await bcrypt.hash(refreshToken, salt);
  const dataStored = await prisma.user.update({
    where: {
      id: userID,
    },
    data: {
      refreshTokenHash: refreshTokenHash,
    },
  });
}