import { BaseContoroller } from "./BaseController";
import { Article, ArticlesResponse } from "../../app/interfaces/article-interface";
import { endpoints } from "../../app/constants";

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

  async addArticleToFavorites(slug: string) {
    const response = await this.request.post(
      this.articlesEndpoint + slug + this.favoriteSuffix
    );
    return response;
  }
  
  async removeArticleFromFavorites(slug: string) {
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

  async getFirstOtherAuthor() {
    const response = await this.request.get(this.articlesEndpoint);
    const json: ArticlesResponse = await response.json();
    const myUsername = process.env.USER_NAME;
    if (!json.articles) {
      throw new Error("No articles found");
    }
    const otherArticles = json.articles.filter(
      (article) => article.author && article.author.username !== myUsername
    );
    if (otherArticles.length > 0 && otherArticles[0].author && otherArticles[0].author.username) {
      return otherArticles[0].author.username;
    }
    throw new Error("No authors found");
  }
}
