export interface Bucket {
  id: string;
  name: string;
  location: string;
  files: Array<{
    fileId: string;
    name: string;
    size: number;
    lastModified: string;
  }>;
}