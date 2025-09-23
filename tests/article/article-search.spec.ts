import { expect, test } from "../../fixtures/fixtures";
import { debugPrint } from "../../helpers/debug.helper";
import { ArticleData } from "../../test-data/ArticleData";
import { getEnvUserCredentials } from "../../helpers/env.helper";
import { generateRandomNumber } from "../../helpers/data.helper";
import { clearUserArticles } from "../../helpers/hooks.helper";

let articleCreateResponseJson: any;
let numberOfArticlesToCreate: number;
const defaultAuthor = getEnvUserCredentials().USER_NAME;

test.describe("Article Search", () => {

  test.beforeEach(async ({ apiClientAuth }) => {
    numberOfArticlesToCreate = generateRandomNumber(3, 5);
    for (let i = 0; i < numberOfArticlesToCreate; i++) {
      const createArticleObject = await apiClientAuth.article.createArticle(ArticleData.getDefaultArticleData());
      articleCreateResponseJson = await createArticleObject.response.json();
      debugPrint("Created article with title: " + JSON.stringify(articleCreateResponseJson.article.title));
    }
  });

  test.afterAll(async ({ apiClientAuth }) => {
    await clearUserArticles(apiClientAuth);
  });

  test("TC-2031 search article by Author",
    { tag: ["@article", "@search"] },
    async ({ apiClientAuth }) => {
      const getArticlesResponse = await apiClientAuth.article.getArticlesByAuthor(defaultAuthor);
      expect(getArticlesResponse.status()).toBe(200);
      const receivedArticles = await getArticlesResponse.json();
      expect(receivedArticles.articles.length).toBeGreaterThan(0);
      debugPrint("Number of articles by author " + defaultAuthor + ": " + receivedArticles.articles.length);

      for (const article of receivedArticles.articles) {
        expect(article.author.username).toEqual(defaultAuthor);
      }
    }
  );

  test("TC-2032 search article by tag",
    { tag: ["@article", "@search"] },
    async ({ apiClientAuth }) => {
      const searchTag = ArticleData.getDefaultArticleData().article.tagList[0];
      const getArticlesResponse = await apiClientAuth.article.getArticlesByTag(searchTag);
      expect(getArticlesResponse.status()).toBe(200);
      const receivedArticles = await getArticlesResponse.json();
      expect(receivedArticles.articles.length).toBeGreaterThan(0);
      debugPrint("Number of articles with tag " + searchTag + ": " + receivedArticles.articles.length);
 
      for (const article of receivedArticles.articles) {
        expect(article.tagList).toContain(searchTag);
      }
    });
});