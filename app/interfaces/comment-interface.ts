import { Author } from "./author-interface";

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
