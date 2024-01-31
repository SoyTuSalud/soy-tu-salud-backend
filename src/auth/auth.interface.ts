export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  statusAccount: string;
}

export interface Payload {
  userId: string;
  email: string;
  role: string;
  statusAccount: string;
}
