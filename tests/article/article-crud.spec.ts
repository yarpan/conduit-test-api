import { expect, test } from "../../fixtures/fixtures";
import { debugPrint } from "../../helpers/debug.helper";
import { ArticleData } from "../../test-data/ArticleData";
import { ArticleSchemas } from "../../app/schemas/ArticleSchemas";
import { clearUserArticles } from "../../helpers/hooks.helper";

let articleCreateResponse: any;
let articleCreateResponseJson: any;
let articleSlug: string;

test.describe("Articles CRUD", () => {

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

  test("TC-2001 create article with valid data",
    { tag: ["@article", "@crud", "@schema"] },
    async () => {
      expect(articleCreateResponse.status()).toBe(200);
      expect(articleSlug).toBeDefined();
      const validationResult = ArticleSchemas.ArticleResponse.validate(await articleCreateResponse.json());
      expect(validationResult.error).toBeUndefined();
    });

  test("TC-2002 edit article title, json schema validation",
    { tag: ["@article", "@crud", "@schema"] },
    async ({ apiClientAuth }) => {
      const editResponse = await apiClientAuth.article.editArticle(ArticleData.getDataForUpdateArticle(), articleSlug);
      expect(editResponse.status()).toBe(200);
      const editedArticle = await editResponse.json();
      debugPrint("Edited article: " + JSON.stringify(editedArticle));
      expect(editedArticle.article.slug).toEqual(articleSlug);
      expect(articleCreateResponseJson.article.title).not.toEqual(editedArticle.article.title);
      expect(editedArticle.article.createdAt).not.toEqual(editedArticle.article.updatedAt);
      const schemaValidationResult = ArticleSchemas.ArticleResponse.validate(editedArticle);
      expect(schemaValidationResult.error).toBeUndefined();
    });

  test("TC-2003 delete article",
    { tag: ["@article", "@crud"] },
    async ({ apiClientAuth }) => {
      const response = await apiClientAuth.article.deleteArticle(articleSlug);
      expect(response.status()).toBe(204);
      const responseAfterDeletion = await apiClientAuth.article.getArticle(articleSlug);
      expect(responseAfterDeletion.status()).toBe(404);
    });
});