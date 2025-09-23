import { expect, test } from "../../fixtures/fixtures";
import { debugPrint } from "../../helpers/debug.helper";
import { ArticleData } from "../../test-data/ArticleData";
import { ArticleSchemas } from "../../app/schemas/ArticleSchemas";
import { getEnvUserCredentials } from "../../helpers/env.helper";
import { ArticleResponse } from "../../app/interfaces/article-interface";

let articleCreateResponse: any;
let articleCreateResponseJson: any;
let articleSlug: string;

test.describe("Articles CRUD", () => {

  test.beforeEach(async ({ apiClientAuth }) => {
    const createArticleObject = await apiClientAuth.article.createArticle(ArticleData.getDefaultArticleData());
    articleCreateResponse = createArticleObject.response;
    articleCreateResponseJson = await createArticleObject.response.json();
    articleSlug = createArticleObject.slug;
    debugPrint("Created article: " + JSON.stringify(articleCreateResponseJson));
  });

  test.afterAll(async ({ apiClientAuth }) => {
    const response = await apiClientAuth.article.getArticlesByAuthor(getEnvUserCredentials().USER_NAME);
    const json = await response.json();
    const slugs = json.articles.map((article: ArticleResponse) => article.slug);

    for (const slug of slugs) {
      const res = await apiClientAuth.article.deleteArticle(slug);
      expect(res.status()).toBe(204);
      debugPrint("Deleted article: " + slug);
    }
  });

  test("TC-1211 create article with valid data",
    { tag: ["@article", "@schema"] },
    async () => {
      expect(articleCreateResponse.status()).toBe(200);
      expect(articleSlug).toBeDefined();
      const validationResult = ArticleSchemas.ArticleResponse.validate(await articleCreateResponse.json());
      expect(validationResult.error).toBeUndefined();
    });

  test("TC-1212 edit article title, json schema validation",
    { tag: ["@article"] },
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

  test("TC-1213 delete article",
    { tag: ["@article"] },
    async ({ apiClientAuth }) => {
      const response = await apiClientAuth.article.deleteArticle(articleSlug);
      expect(response.status()).toBe(204);
      const responseAfterDeletion = await apiClientAuth.article.getArticle(articleSlug);
      expect(responseAfterDeletion.status()).toBe(404);
    });
});