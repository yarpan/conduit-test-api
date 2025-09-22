import { test as base, request } from "@playwright/test";
import { APIClient } from "../ApiClient";


type Fixtures = {
  apiClientNoAuth: APIClient;
  apiClientAuth: APIClient;
};

export const test = base.extend<Fixtures>({
  apiClientNoAuth: async ({ request }, use) => {
    const apiClient = new APIClient(request);
    await use(apiClient);
  },

  apiClientAuth: async ({ }, use) => {
    // const token = await TokenHelper.getToken(apiClient);
    const token = process.env.TOKEN;
    if (!token) {
      throw new Error("Environment variable TOKEN is not defined.");
    }

    const requestWithToken = await request.newContext({
      extraHTTPHeaders: { Authorization: `Token ${token}` },
    });
    const apiClientWithToken = new APIClient(requestWithToken);
    await use(apiClientWithToken);
  },
});


export { expect } from "@playwright/test";


