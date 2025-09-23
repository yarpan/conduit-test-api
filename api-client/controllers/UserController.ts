import { BaseContoroller } from "./BaseController";
import { User, UserCredentials } from "../../app/interfaces/user.interface";
import { endpoints } from "../../app/constants";

export class UserController extends BaseContoroller {
  private userEndpoint = endpoints.user;
  private usersEndpoint = endpoints.users;
  private loginEndpoint = endpoints.userLogin;
  private profileEndpoint = endpoints.profiles;
  private followSuffix = endpoints.profilesFollow;

  async createUser(userData: User | UserCredentials) {
    const response = await this.request.post(this.usersEndpoint, {
      data: userData,
    });
    return response;
  }

  async loginUser(email: string | undefined, password: string | undefined) {
    const response = await this.request.post(this.loginEndpoint, {
      data: { 
        user: { 
          email: email, 
          password: password 
        } },
    });
    return response;
  }

  async editUser(userData: User | UserCredentials) {
    const response = await this.request.put(this.userEndpoint, {
      data: userData,
    });
    return response;
  }

  async getUserProfile(userName: string) {
    const response = await this.request.get(this.profileEndpoint + userName);
    return response;
  }

  async followUser(userName: string) {
    const response = await this.request.post(
      this.profileEndpoint + userName + this.followSuffix
    );
    return response;
  }

  async unFollowUser(userName: string) {
    const response = await this.request.delete(
      this.profileEndpoint + userName + this.followSuffix
    );
    return response;
  }
}
