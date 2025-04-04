export type JwtPayload = {
  uid: string;
  email: string;
};

export type JwtRefreshPayload = {
  uid: string;
  tokenId: string;
};
