import { faker } from "@faker-js/faker";

export class ArticleData {

  static getDefaultArticleData() {
    return {
      article: {
        author: {},
        title: faker.lorem.words({ min: 3, max: 5 }),
        description: faker.lorem.sentence(),
        body: faker.lorem.paragraphs({ min: 3, max: 4 }),
        tagList: ["dojo", "playwright"]
      },
    }
  };

  static getDataForUpdateArticle() {
    return {
      article: {
        title: faker.lorem.words(3) + " [updated]",
      },
    }
  };

  static getRandomCommentForArticle(){
    return { comment: { body: faker.lorem.sentence() } };
  }
}