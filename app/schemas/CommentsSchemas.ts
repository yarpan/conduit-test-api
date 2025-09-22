import Joi from "joi";
import { ArticlesSchemas } from "./ArticlesSchemas";

export class CommentsSchemas {
  static readonly Comment = Joi.object({
    id: Joi.string().required(),
    body: Joi.string().required(),
    createdAt: Joi.string().required(),
    author: ArticlesSchemas.Author.required(),
  });

  static readonly CommentResponse = Joi.object({
    comment: CommentsSchemas.Comment.required(),
  });

  static readonly CommentsResponse = Joi.object({
    comments: Joi.array().items(CommentsSchemas.Comment).required(),
  });
}
