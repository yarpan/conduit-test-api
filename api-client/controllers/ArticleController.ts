import { BaseContoroller } from "./BaseController";
import { Article, ArticlesResponse } from "../../app/interfaces/article.interface";
import { endpoints } from "../../app/constants";
import { getEnvUserCredentials } from "../../helpers/env.helper";

export class ArticleController extends BaseContoroller {
  private articlesEndpoint = endpoints.articles;
  private favoriteSuffix = endpoints.articlesFavorite;

  async createArticle(articleData: Article) {
    const response = await this.request.post(this.articlesEndpoint, {
      data: articleData,
    });
    const json = await response.json();
    const slug: string = json.article.slug;
    const author: string = json.article.author.username;
    const tag: string = json.article.tagList[0];
    return { response, slug, author, tag };
  }

  async getArticle(slug: string) {
    const response = await this.request.get(this.articlesEndpoint + slug);
    return response;
  }

  async editArticle(articleData: Article, slug: string) {
    const response = await this.request.put(this.articlesEndpoint + slug, {
      data: articleData,
    });
    return response;
  }

  async deleteArticle(slug: string) {
    const response = await this.request.delete(this.articlesEndpoint + slug);
    return response;
  }

  async addToFavorites(slug: string) {
    const response = await this.request.post(
      this.articlesEndpoint + slug + this.favoriteSuffix
    );
    return response;
  }

  async removeFromFavorites(slug: string) {
    const response = await this.request.delete(
      this.articlesEndpoint + slug + this.favoriteSuffix
    );
    return response;
  }

  async getFavoriteArticles(author: string) {
    const response = await this.request.get(this.articlesEndpoint, {
      params: {
        favorited: author,
      },
    });
    return response;
  }

  async getArticlesByAuthor(author: string) {
    const response = await this.request.get(this.articlesEndpoint, {
      params: {
        author: author,
      },
    });
    return response;
  }

  async getArticlesByTag(tag: string) {
    const response = await this.request.get(this.articlesEndpoint, {
      params: {
        tag: tag,
      },
    });
    return response;
  }

  async getArticlesList() {
    const response = await this.request.get(this.articlesEndpoint);
    return response;
  }

  async getOtherAuthorByIndex(index: number = 0) {
    const response = await this.request.get(this.articlesEndpoint);
    const json: ArticlesResponse = await response.json();

    if (!json.articles) {
      throw new Error("No articles found");
    }

    const otherArticles = json.articles.filter((article) =>
      article.author && article.author.username !== getEnvUserCredentials().USER_NAME
    );

    if (
      otherArticles.length > index &&
      otherArticles[index] &&
      otherArticles[index].author &&
      otherArticles[index].author.username
    ) {
      return otherArticles[index].author.username;
    }

    throw new Error("No authors found");
  }
}
