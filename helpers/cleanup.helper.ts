import { ArticleResponse } from "../app/interfaces/article.interface";
import { debugPrint } from "./debug.helper";
import { getEnvUserCredentials } from "./env.helper";


export async function clearUserArticles(apiClientAuth: any) {
    const response = await apiClientAuth.article.getArticlesByAuthor(getEnvUserCredentials().USER_NAME);
    const json = await response.json();
    const slugs = json.articles.map((article: ArticleResponse) => article.slug);

    for (const slug of slugs) {
        const response = await apiClientAuth.article.deleteArticle(slug);
        if (response.status() !== 204) {
            debugPrint("Failed to delete article: " + slug);
        }
    }
    debugPrint("Deleted article: " + slugs.length);
}