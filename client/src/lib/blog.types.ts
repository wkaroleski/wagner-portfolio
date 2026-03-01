export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  updatedDate?: string;
  tags: string[];
  category: string;
  readingTime: number;
  featured?: boolean;
  image?: string;
}

export interface BlogMetadata {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  updatedDate?: string;
  tags: string[];
  category: string;
  readingTime: number;
  featured?: boolean;
  image?: string;
}
