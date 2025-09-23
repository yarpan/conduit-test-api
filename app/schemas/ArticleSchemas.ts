import Joi from "joi";

export class ArticleSchemas {
  static readonly Author = Joi.object({
    username: Joi.string().required(),
    bio: Joi.string().optional(),
    image: Joi.string().uri().required(),
    following: Joi.boolean().required(),
  });

  static readonly Article = Joi.object({
    slug: Joi.string().required(),
    title: Joi.string().required().allow(""),
    description: Joi.string().required().allow(""),
    body: Joi.string().required().allow(""),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    tagList: Joi.array().items(Joi.string()).required(),
    favorited: Joi.boolean().required(),
    favoritesCount: Joi.number().required(),
    author: ArticleSchemas.Author,
  });

  static readonly ArticleResponse = Joi.object({
    article: ArticleSchemas.Article.required(),
  });
}
