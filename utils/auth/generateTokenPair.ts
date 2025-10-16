import jwt from "jsonwebtoken";

type tokenPair = {
  accessToken: string,
  refreshToken: string
}

export function generateTokenPair(
  id: number,
  role: string,
): tokenPair {
  const accessPayload = {
    id: id,
    type: "ACCESS",
    role: role,
  };

  const refreshPayload = {
    id: id,
    type: "REFRESH",
  };

  const accessToken = jwt.sign(accessPayload, process.env.TOKEN_SECRET, {
    expiresIn: "5m",
  });

  const refreshToken = jwt.sign(
    refreshPayload,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return {
    accessToken:accessToken,
    refreshToken:refreshToken
  };
}