import { test as setup, expect } from "../fixtures/fixtures";
import { debugPrint } from "../helpers/debug.helper";
import { getUserCredentials } from "../helpers/env.helper";

setup("Check if user exist and create if not", async ({ apiClientNoAuth }) => {
  let token: string;
  const { USER_EMAIL, USER_NAME, USER_PASSWORD } = getUserCredentials();
  // Try to login with existing user
  debugPrint('USER_EMAIL, USER_NAME, USER_PASSWORD: ' + USER_EMAIL + ', ' + USER_NAME + ', ' + USER_PASSWORD);  
  const loginResponse = await apiClientNoAuth.user.login(USER_EMAIL, USER_PASSWORD);
  debugPrint("loginResponse.status: " + loginResponse.status());

  if (loginResponse.ok()) {
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.user.token;
    debugPrint(`User ${USER_EMAIL} already exists. token: ${token}`);
  } else {
    console.log('Login failed with msg: ' + JSON.stringify(await loginResponse.json()));

    // If login fails, create a new user
    const createResponse = await apiClientNoAuth.user.createUser({
      user: {
        email: USER_EMAIL,
        password: USER_PASSWORD,
        username: USER_NAME,
      },
    });

    const createResponseJson = await createResponse.json();
    debugPrint("createResponseJson: " + JSON.stringify(createResponseJson));
    expect(createResponse.status()).toBe(200);
    token = createResponseJson.user.token;
    expect(token).toBeDefined();
    debugPrint(`User ${USER_EMAIL} created with token: ${token}`);
  }

  process.env.TOKEN = token;
});



