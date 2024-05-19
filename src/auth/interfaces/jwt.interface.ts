export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  statusAccount: string;
}

export interface JwtClaims {
  jti: string;
  iat: number;
  exp: number;
}

export type AccessToken = JwtPayload & JwtClaims;
