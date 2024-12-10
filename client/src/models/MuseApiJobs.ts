export interface MuseApiInfo {
  id: number
  contents: string;
  name: string;
  publication_date: string;
  refs: { landing_page: string };
  levels: { name: string }[];
  locations: { name: string }[];
  company: { name: string };
}