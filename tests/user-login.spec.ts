import { expect, test } from "../fixtures/fixtures";




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


for (const { testId, suffix, credentials, check } of userLoginValid) {
  test(
    `CN-002-${testId} unseccessfull login with ${suffix}`,
    { tag: ["@user", "@smoke", "@regression"] },
    async ({ apiClientNoAuth }) => {
      const response = await apiClientNoAuth.user.login(
        credentials.email,
        credentials.password
      );
              
          expect(response.status()).toBe(422);
          const errMsg = (await response.json()).errors["email or password"];
          expect(errMsg).toEqual(messages.invalid);
       
    }
  );
}