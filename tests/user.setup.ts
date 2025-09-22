import { test as setup, expect } from "../app/fixtures/fixtures";
import { debugPrint } from "../helpers/debug.helper";

setup("Check if user exist and create if not", async ({ apiClientNoAuth }) => {
  let token: string;
  const { EMAIL: USER_EMAIL, USER_NAME, PASSWORD: USER_PASSWORD } = process.env;

  if (!USER_EMAIL || !USER_PASSWORD || !USER_NAME) {
    throw new Error("EMAIL, USER_NAME and PASSWORD environment variables must be defined.");
  }

  const loginResponse = await apiClientNoAuth.user.login(USER_EMAIL, USER_PASSWORD);
  debugPrint("loginResponse.status: " + loginResponse.status());

  if (loginResponse.ok()) {
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.user.token;
    debugPrint(`User ${USER_EMAIL} already exists. token: ${token}`);
  } else {
    const createResponse = await apiClientNoAuth.user.createUser({
      user: {
        email: USER_EMAIL,
        password: USER_PASSWORD,
        username: USER_NAME,
      },
    });

    expect(createResponse.status()).toBe(200);
    const createResponseJson = await createResponse.json();
    token = createResponseJson.user.token;
    expect(token).toBeDefined();
    debugPrint(`User ${USER_EMAIL} created with token: ${token}`);
  }

  process.env.TOKEN = token;
});



