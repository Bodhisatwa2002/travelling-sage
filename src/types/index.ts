export interface BlogPost {
  slug: string;
  issueNumber: string;
  title: string;
  subtitle?: string;
  category: string;
  destination?: string;
  author: string;
  readTime: string;
  image: string;
  featured?: boolean;
  publishedAt?: string;
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  content?: {
    heading: string;
    paragraphs: string[];
    images?: { url: string; alt?: string; caption?: string }[];
    subSections?: {
      heading: string;
      paragraphs: string[];
      images?: { url: string; alt?: string; caption?: string }[];
    }[];
  }[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Destination {
  slug: string;
  name: string;
  description: string;
  image: string;
  region: string;
}

export interface Region {
  slug: string;
  name: string;
}

export interface Author {
  slug: string;
  name: string;
  role?: string;
  bio?: string;
  image?: string;
}
