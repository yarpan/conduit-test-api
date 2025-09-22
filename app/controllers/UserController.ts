import { BaseContoroller } from "./BaseController";
import { User, UserCredentials } from "../interfaces/user.interface";

export class UserController extends BaseContoroller {
  private usersEndpoint: string = "/api/users/";

  async login(email: string, password: string) {
    const response = await this.request.post(this.usersEndpoint + "login", {
      data: { user: { email: email, password: password } },
    });
    return response;
  }

  async createUser(userData: User | UserCredentials) {
    const response = await this.request.post(this.usersEndpoint, {
      data: userData,
    });
    return response;
  }

  async editUser(userData: User | UserCredentials) {
    const response = await this.request.put("/api/user", {
      data: userData,
    });
    return response;
  }
}
