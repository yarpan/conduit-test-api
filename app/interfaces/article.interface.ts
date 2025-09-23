import { Author } from "./user.interface";

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

export interface Comment {
  comment: {
    body: string;
  };
}

export interface CommentResponse {
  id?: string;
  createdAt?: string;
  author?: Author;
}
