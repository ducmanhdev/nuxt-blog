export interface Post {
  path?: string;
  title: string;
  date: string;
  description: string;
  image: string;
  alt: string;
  categories: string[];
  ogImage?: string;
  published?: boolean;
}
