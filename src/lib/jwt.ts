type JwtPayload = {
  sub: number;
  role: "ADMIN" | "BUYER";
  exp: number;
};

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(Buffer.from(payload, "base64").toString());
  } catch {
    return null;
  }
}
