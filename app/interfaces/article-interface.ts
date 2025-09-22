import { Author } from "./author-interface";

export interface Article {
  article?: {
    author?: {};
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
    favorited?: boolean;
    favoritesCount?: number;
  };
}

export interface ArticleResponse {
  slug?: string;
  title?: string;
  description?: string;
  body?: string;
  createdAt?: string;
  updatedAt?: string;
  tagList?: string[];
  favorited?: boolean;
  favoritesCount?: number;
  author?: Author;
}

export interface ArticlesResponse {
  articles?: ArticleResponse[];
  articlesCount?: number;
}
