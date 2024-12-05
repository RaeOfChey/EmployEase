import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = async ({ req }: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return {}; // Return empty context
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer"
  if (!token) {
    return {}; // Return empty context
  }

  const secret = process.env.JWT_SECRET; // Load secret from environment variables
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  try {
    const decodedUser = jwt.verify(token, secret);
    return { user: decodedUser }; // Attach user to context
  } catch (err) {
    console.error("JWT verification failed:", err);
    return {}; // Return empty context on failure
  }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error('JWT_SECRET_KEY is not defined in environment variables');
  }

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};