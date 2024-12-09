import type { Job } from './Job';

export interface User {
  username: string | null;
  password: string | null;
  savedJobs: Job[];
}
