export interface Job {
  jobId: number;
  content: string;
  jobTitle: string;
  datePublished: string;
  refs: { landingPage: string };
  levels: { name: string }[];
  locations: { name: string }[];
  company: { name: string };
  applied?: boolean
}
