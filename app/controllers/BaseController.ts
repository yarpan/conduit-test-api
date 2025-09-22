import { APIRequestContext } from "@playwright/test";

export abstract class BaseContoroller {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
}
