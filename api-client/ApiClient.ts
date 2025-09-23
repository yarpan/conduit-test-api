import { APIRequestContext } from "@playwright/test";
import { UserController } from "./controllers/UserController";
import { ArticleController } from "./controllers/ArticleController";
import { CommentController } from "./controllers/CommentController";
import { TagController } from "./controllers/TagController";

export class APIClient {
  user: UserController;
  article: ArticleController;
  comment: CommentController;
  tag: TagController;

  constructor(request: APIRequestContext) {
    this.user = new UserController(request);
    this.article = new ArticleController(request);
    this.comment = new CommentController(request);
    this.tag = new TagController(request);
  }
}