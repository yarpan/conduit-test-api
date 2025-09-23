import { expect, test } from "../../fixtures/fixtures";
import { ArticleSchemas } from "../../app/schemas/ArticleSchemas";
import { getEnvUserCredentials } from "../../helpers/env.helper";
import { clearUserArticles } from "../../helpers/hooks.helper";
import { debugPrint } from "../../helpers/debug.helper";
import { ArticleData } from "../../test-data/ArticleData";

let articleCreateResponse: any;
let articleCreateResponseJson: any;
let articleSlug: string;

test.describe("Favorites tests", () => {

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

  test("TC-2021 add article to favorites",
    { tag: ["@article", "@favorites", "@schema"] },
    async ({ apiClientAuth }) => {

      // add article to favorite
      const favoriteResponse = await apiClientAuth.article.addToFavorites(articleSlug);
      expect(favoriteResponse.status()).toBe(200);
      const favoriteResponseJson = await favoriteResponse.json();
      expect(favoriteResponseJson.article.favoritesCount).toBeGreaterThan(articleCreateResponseJson.article.favoritesCount);

      // get user favorites list
      const response = await apiClientAuth.article.getFavoriteArticles(getEnvUserCredentials().USER_NAME);
      expect(response.status()).toBe(200);
      const favoriteList = await response.json();

      // article in user's favorites list
      const slugs = favoriteList.articles?.map((a: { slug: string }) => a.slug) ?? [];
      expect(slugs).toContain(articleCreateResponseJson.article.slug);

      // json schema validation
      const favoriteResponseValidation = ArticleSchemas.ArticleResponse.validate(favoriteResponseJson);
      expect(favoriteResponseValidation.error).toBeUndefined();
    }
  );

  test("TC-2022 remove article from favorites",
    { tag: ["@article", "@favorites"] },
    async ({ apiClientAuth }) => {
      // add article to favorite
      const favoriteResponse = await apiClientAuth.article.addToFavorites(articleSlug);
      expect(favoriteResponse.status()).toBe(200);

      // remove article from favorite
      const removeFavoriteResponse = await apiClientAuth.article.removeFromFavorites(articleSlug);
      expect(removeFavoriteResponse.status()).toBe(200);
      const removefavoriteResponseJson = await removeFavoriteResponse.json();
      expect(removefavoriteResponseJson.article.favoritesCount).toEqual(articleCreateResponseJson.article.favoritesCount);

      // get user favorites list and check article is not in the list
      const response = await apiClientAuth.article.getFavoriteArticles(getEnvUserCredentials().USER_NAME);
      expect(response.status()).toBe(200);
      const favoriteList = await response.json();
      const slugs = favoriteList.articles?.map((a: { slug: string }) => a.slug) ?? [];
      expect(slugs).not.toContain(articleCreateResponseJson.article.slug);
    }
  );
});