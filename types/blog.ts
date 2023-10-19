export interface Post {
  path?: string;
  title: string;
  date: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  ogImage?: string;
  published?: boolean;
}
