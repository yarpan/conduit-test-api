import { expect, test } from "../fixtures/fixtures";

const userData = {
  user: {
    email: "Pleyadda@mainmail.com",
    password: "password123",
    username: "Pleyadda",
  },
};

test.skip(`TC-001 registration`, async ({ apiClientNoAuth }) => {
  const response = await apiClientNoAuth.user.createUser(userData);
  expect(response.status()).toBe(200);
  const token = (await response.json()).user.token;
  expect(token).toBeDefined();
});

test.skip("Create new user", async ({ apiClientNoAuth }) => {


  // 1. try to login as user - if exists, then skip creation
  const { EMAIL, USER_NAME, PASSWORD } = process.env;

  if (!EMAIL || !PASSWORD || !USER_NAME) {
    throw new Error("EMAIL, USER_NAME and PASSWORD environment variables must be defined.");
  }

  const userExistCheck = await apiClientNoAuth.user.login(EMAIL, PASSWORD);
  //const userExistCheck = await apiClient.user.login(EMAIL, PASSWORD);
  console.log("ifUserExist: " + userExistCheck.ok())


});