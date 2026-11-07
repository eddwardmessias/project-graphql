import { eq } from 'drizzle-orm';
import type { FastifyReply } from 'fastify';
import { db } from '../database';
import { users } from '../database/schemas/users';
import { ClientError } from '../shared/errors/app-error';
import { signJwt } from '../shared/utils/jwt';
import { hashPassword } from '../shared/utils/hash';
import type { RegisterInput } from '../dtos/input/auth.input';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class AuthService {
	async register(input: RegisterInput): Promise<AuthUser> {
		const existingUser = db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.email, input.email))
			.get();

		if (existingUser) {
			throw new ClientError('Email already registered.', 409);
		}

		const [user] = db
			.insert(users)
			.values({
				name: input.name,
				email: input.email,
				password: await hashPassword(input.password),
			})
			.returning({
				id: users.id,
				name: users.name,
				email: users.email,
				createdAt: users.createdAt,
				updatedAt: users.updatedAt,
			})
			.all();

		if (!user) {
			throw new ClientError('Could not create user.', 500);
		}

		return user;
	}

	async generateTokens(reply: FastifyReply, user: AuthUser) {
		const token = await signJwt(
			reply,
			{ id: user.id, email: user.email },
			'15m',
		);
		const refreshToken = await signJwt(
			reply,
			{ id: user.id, email: user.email },
			'1d',
		);

		return { token, refreshToken, user };
	}

}

