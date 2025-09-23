import Joi from "joi";
import { ArticleSchemas } from "./ArticleSchemas";

export class CommentSchemas {
  static readonly Comment = Joi.object({
    id: Joi.string().required(),
    body: Joi.string().required(),
    createdAt: Joi.string().required(),
    author: ArticleSchemas.Author.required(),
  });

  static readonly CommentResponse = Joi.object({
    comment: CommentSchemas.Comment.required(),
  });

  static readonly CommentsResponse = Joi.object({
    comments: Joi.array().items(CommentSchemas.Comment).required(),
  });
}
