import { expect, test } from "../../fixtures/fixtures";
import { clearUserArticles } from "../../helpers/cleanup.helper";
import { generateRandomNumber } from "../../helpers/data.helper";
import { debugPrint } from "../../helpers/debug.helper";
import { ArticleData } from "../../test-data/ArticleData";

test.describe("Article tags tests", () => {

  test.afterAll(async ({ apiClientAuth }) => {
    await clearUserArticles(apiClientAuth);
  });

  test("TC-2041 search articles with known/own tag",
    { tag: ["@article", "@search", "@tag"] },
    async ({ apiClientAuth }) => {
      // create some articles with own tag
      const numberOfArticlesToCreate = generateRandomNumber(3, 5);

      for (let i = 0; i < numberOfArticlesToCreate; i++) {
        const createArticleObject = await apiClientAuth.article.createArticle(ArticleData.getDefaultArticleData());
        const articleCreateResponseJson = await createArticleObject.response.json();
        debugPrint("Created article with title: " + JSON.stringify(articleCreateResponseJson.article.title));
      }
      const ownTags = ArticleData.getDefaultArticleData().article.tagList;

      // get list of articles with tag = ownTags[0]
      const getArticlesResponse = await apiClientAuth.article.getArticlesByTag(ownTags[0]);
      expect(getArticlesResponse.status()).toBe(200);
      
      const articlesResponseJson = await getArticlesResponse.json();
      const articlesWithTag = articlesResponseJson.articles.length;
      debugPrint("Number of articles with tag " + ownTags[0] + ": " + articlesWithTag);
      expect(articlesWithTag).toBeGreaterThanOrEqual(numberOfArticlesToCreate);
    }
  );

  test("TC-2042 search article with random tag from site",
    { tag: ["@article", "@search", "@tag"] },
    async ({ apiClientAuth }) => {
      // get random tag from site 
      const existingTags = await apiClientAuth.tag.getExistingTags();
      debugPrint("Existing tags: " + JSON.stringify(existingTags));
      debugPrint("Existing tags number: " + existingTags.length);
      const randomTagId = generateRandomNumber(0, existingTags.length - 1);
      const randomTag = existingTags[randomTagId];

      // get list of articles with randomTag
      debugPrint("Searching articles with random tag: " + randomTag);
      const getArticlesResponse = await apiClientAuth.article.getArticlesByTag(randomTag);
      expect(getArticlesResponse.status()).toBe(200);

      // validate number of articles with this tag
      const articlesResponseJson = await getArticlesResponse.json();
      const articlesWithTag = articlesResponseJson.articles.length;
      debugPrint("Number of articles with tag " + randomTag + ": " + articlesWithTag);
      expect(articlesWithTag).toBeGreaterThanOrEqual(1);
    });
});