import { expect, test } from "../fixtures/fixtures";
import { getUserCredentials } from "../helpers/env.helper";
import { UserData } from "../test-data/user-login-data";




for (const { testId, suffix, credentials } of UserData.userDataLoginValid()) {
  test(
    `CN-002-${testId} seccessfull login with ${suffix}`,
    { tag: ["@user", "@smoke", "@regression"] },
    async ({ apiClientNoAuth }) => {
      const response = await apiClientNoAuth.user.login(
        credentials.email,
        credentials.password
      );

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.user.token).toBeDefined();
      expect(body.user.email).toBe(getUserCredentials().USER_EMAIL);
    }
  );
}


for (const { testId, suffix, credentials } of UserData.userDataLoginInvalid()) {
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