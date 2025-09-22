import { endpoints } from "../../app/constants";
import { BaseContoroller } from "./BaseController";

export class TagController extends BaseContoroller {
  private tagsEndpoint = endpoints.tags;

  async getPopularTags() {
    const response = await this.request.get(this.tagsEndpoint);
    const json = await response.json();
    return json.tags;
  }
}
