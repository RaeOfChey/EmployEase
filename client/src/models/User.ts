import type { Book } from './Book';

export interface User {
  username: string | null;
  password: string | null;
  savedBooks: Book[];
}
