import type { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

export class ClientError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

type FastifyErrorHandler = (
  error: unknown,
  request: FastifyRequest,
  reply: FastifyReply,
) => FastifyReply | Promise<FastifyReply>;

export const errorHandler: FastifyErrorHandler = (error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    });
  }

  if (error instanceof ClientError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    });
  }

  console.error(error);

  return reply.status(500).send({
    message: 'Internal server error',
  });
};