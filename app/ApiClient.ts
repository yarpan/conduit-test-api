import { APIRequestContext } from "@playwright/test";
import { UserController } from "./controllers/UserController";


export class APIClient {
  user: UserController;


  constructor(request: APIRequestContext) {
    this.user = new UserController(request);

  }
}
