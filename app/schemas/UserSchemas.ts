import Joi from "joi";

export class UserSchemas {
  static readonly User = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    token: Joi.string().required(),
    bio: Joi.string().optional().allow(""),
    image: Joi.string().uri().required(),
  });

  static readonly UserResponse = Joi.object({
    user: UserSchemas.User,
  });
}
