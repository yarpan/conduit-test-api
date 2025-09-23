import { BaseContoroller } from "./BaseController";
import { Comment } from "../../app/interfaces/comment-interface";
import { endpoints } from "../../app/constants";

export class CommentController extends BaseContoroller {
  private articlesEndpoint = endpoints.articles;
  private commentsSuffix = endpoints.articlesComments;

  async addArticleComment(slug: string, body: Comment) {
    const response = await this.request.post(
      this.articlesEndpoint + slug + this.commentsSuffix,
      {
        data: body,
      }
    );
    const json = await response.json();
    const commentId = json.comment.id as string;
    return { response, commentId };
  }

  async getArticleComments(slug: string) {
    const response = await this.request.get(
      this.articlesEndpoint + slug + this.commentsSuffix
    );
    return response;
  }

  async deleteArticleComment(slug: string, commentId: string) {
    const response = await this.request.delete(
      this.articlesEndpoint + slug + this.commentsSuffix + `/${commentId}`
    );
    return response;
  }
}
