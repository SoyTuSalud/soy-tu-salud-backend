import { Request } from 'express';

export function extractTokenFromHeader(request: Request): string | undefined {
  const authorization = request.headers.authorization;
  const [type, token] = authorization?.split(' ') ?? [];
  return type?.match(/bearer/i) ? token : undefined;
}
