import { expect, test } from "../app/fixtures/fixtures";

const { USER_EMAIL, USER_PASSWORD } = process.env;

if (!USER_EMAIL || !USER_PASSWORD) {
  throw new Error("USER_EMAIL and USER_PASSWORD environment variables must be defined.");
}


test(`TC-002 login`, async ({ apiClientNoAuth }) => {

  const response = await apiClientNoAuth.user.login(
    USER_EMAIL,
    USER_PASSWORD
  );

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.user.token).toBeDefined();
  expect(body.user.email).toBe(USER_EMAIL);

});


