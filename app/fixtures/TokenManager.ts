import { ApiClient } from "../ApiClient";
import fs from "fs";

const { EMAIL, USER_NAME, PASSWORD } = process.env;
export const tokenPath = ".token";

export class TokenManager {
  static async getToken(apiClient: ApiClient) {
    let token;

    if (!EMAIL || !PASSWORD) {
      throw new Error("EMAIL and PASSWORD environment variables must be defined.");
    }

    if (fs.existsSync(tokenPath)) {
      token = fs.readFileSync(tokenPath, { encoding: "utf-8" });
      const userExistCheck = await apiClient.user.login(EMAIL, PASSWORD);
      if (!userExistCheck.ok()) {
        fs.unlinkSync(tokenPath);
        token = undefined;
      }
    }

    if (!token) {
      const user = {
        email: EMAIL,
        password: PASSWORD,
        username: USER_NAME,
      };

      await apiClient.user.createUser({ user });
      const loginResponse = await apiClient.user.login(EMAIL, PASSWORD);
      const json = await loginResponse.json();
      token = json.user.token;
      fs.writeFileSync(tokenPath, token);
    }

    return token;
  }
}
