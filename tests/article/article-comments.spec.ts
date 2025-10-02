import { expect, test } from "../../fixtures/fixtures";
import { ArticleSchemas } from "../../app/schemas/ArticleSchemas";
import { debugPrint } from "../../helpers/debug.helper";
import { ArticleData } from "../../test-data/ArticleData";
import { clearUserArticles } from "../../helpers/cleanup.helper";

let articleCreateResponse: any;
let articleCreateResponseJson: any;
let articleSlug: string;

test.describe("Article comments tests", () => {

  test.beforeEach(async ({ apiClientAuth }) => {
    const createArticleObject = await apiClientAuth.article.createArticle(ArticleData.getDefaultArticleData());
    articleCreateResponse = createArticleObject.response;
    articleCreateResponseJson = await createArticleObject.response.json();
    articleSlug = createArticleObject.slug;
    debugPrint("Created article with title: " + JSON.stringify(articleCreateResponseJson.article.title));
  });

  test.afterAll(async ({ apiClientAuth }) => {
    await clearUserArticles(apiClientAuth);
  });

  test("TC-2011 add comment to article",
    { tag: ["@article", "@comment", "@schema"] },
    async ({ apiClientAuth }) => {
      const createCommentResponse = await apiClientAuth.comment.addArticleComment(articleSlug, ArticleData.getRandomCommentForArticle());
      expect(createCommentResponse.response.status()).toBe(200);

      const createdComment = await createCommentResponse.response.json();
      expect(createdComment.comment.id).toBeDefined();

      const createCommentValidation = ArticleSchemas.CommentResponse.validate(createdComment);
      expect(createCommentValidation.error).toBeUndefined();

      const articleComments = await apiClientAuth.comment.getArticleComments(articleSlug);
      const articleCommentsJson = await articleComments.json();
      expect(articleCommentsJson.comments).toContainEqual(createdComment.comment);
      
      const commentsListValidation = ArticleSchemas.CommentsResponse.validate(articleCommentsJson);
      expect(commentsListValidation.error).toBeUndefined();
    }
  );

  test("TC-2012 delete comment from article",
    { tag: ["@article", "@comment"] },
    async ({ apiClientAuth }) => {
      const createCommentResponse = await apiClientAuth.comment.addArticleComment(articleSlug, ArticleData.getRandomCommentForArticle());
      expect(createCommentResponse.response.status()).toBe(200);
      
      const createdComment = await createCommentResponse.response.json();
      const deleteCommentResponse = await apiClientAuth.comment.deleteArticleComment(articleSlug, createdComment.comment.id);
      expect(deleteCommentResponse.status()).toBe(204);
      
      const articleComments = await apiClientAuth.comment.getArticleComments(articleSlug);
      const receivedArticleComments = await articleComments.json();
      expect(receivedArticleComments.comments).not.toContainEqual(createdComment.comment);
    }
  );
});