import { expect, test } from "../app/fixtures/fixtures";

const { EMAIL, USER_NAME, PASSWORD } = process.env;

if (!EMAIL || !PASSWORD) {
  throw new Error("EMAIL and PASSWORD environment variables must be defined.");
}

const credentials = {
  email: EMAIL,
  password: PASSWORD,
}



test(`TC-002 login`, async ({ apiClientNoAuth }) => {


  const response = await apiClientNoAuth.user.login(
    credentials.email,
    credentials.password
  );

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.user.token).toBeDefined();
  expect(body.user.email).toBe(EMAIL);

});


