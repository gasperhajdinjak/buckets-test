export interface Bucket {
  id: number;
  name: string;
  location: string;
  files: { name: string; lastModified: string }[];
}
