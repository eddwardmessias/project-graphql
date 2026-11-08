import type { FastifyReply } from 'fastify';

export type JwtPayload = {
  id: string;
  email: string;
}

export const signJwt = (
  reply: FastifyReply,
  payload: JwtPayload,
  expiresIn = '1h',
) => reply.jwtSign(payload, { expiresIn });
