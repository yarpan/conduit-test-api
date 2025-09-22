import { test as setup, expect } from "../app/fixtures/fixtures";
import { debugPrint } from "../helpers/debug.helper";

setup("Check if user exist and create if not", async ({ apiClientNoAuth }) => {
  let token: string;
  const { EMAIL, USER_NAME, PASSWORD } = process.env;

  if (!EMAIL || !PASSWORD || !USER_NAME) {
    throw new Error("EMAIL, USER_NAME and PASSWORD environment variables must be defined.");
  }

  const loginResponse = await apiClientNoAuth.user.login(EMAIL, PASSWORD);
  debugPrint("loginResponse.status: " + loginResponse.status());

  if (loginResponse.ok()) {
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.user.token;
    debugPrint(`User ${EMAIL} already exists. token: ${token}`);
  } else {
    const createResponse = await apiClientNoAuth.user.createUser({
      user: {
        email: EMAIL,
        password: PASSWORD,
        username: USER_NAME,
      },
    });

    expect(createResponse.status()).toBe(200);
    const createResponseJson = await createResponse.json();
    token = createResponseJson.user.token;
    expect(token).toBeDefined();
    debugPrint(`User ${EMAIL} created with token: ${token}`);
  }

  process.env.TOKEN = token;
});



