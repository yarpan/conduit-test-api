import { expect, test } from "../fixtures/fixtures";
import { debugPrint } from "../helpers/debug.helper";
import { getUserCredentials } from "../helpers/env.helper";
import { UserData } from "../test-data/UserData";




for (const { testId, testName, userData } of UserData.userDataRegisterValid()) {
  test(
    `TC-101${testId} successful registration with ${testName}`,
    { tag: ["@user", "@smoke", "@positive"] },
    async ({ apiClientNoAuth }) => {
      const response = await apiClientNoAuth.user.createUser(userData);

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.user.token).toBeDefined();
      expect(body.user.email).toBe(userData.user.email);
      expect(body.user.username).toBe(userData.user.username);
    }
  );
}


for (const { testId, testName, userData, message } of UserData.userDataRegisterInvalid()) {
  test(
    `TC-102${testId} unsuccessful registration with ${testName}`,
    { tag: ["@user", "@smoke", "@negative"] },
    async ({ apiClientNoAuth }) => {
      const response = await apiClientNoAuth.user.createUser(userData);

      expect(response.status()).toBe(422);
      debugPrint(`Response for test ${testId}: ` + JSON.stringify(await response.json()));
      debugPrint(`Expected error for test ${testId}: ` + JSON.stringify(message));
      expect(await response.json()).toEqual({ errors: message });
    }
  );
}




for (const { testId, testName, userData } of UserData.userDataLoginValid()) {
  test(
    `TC-111${testId} successful login with ${testName}`,
    { tag: ["@user", "@smoke", "@positive"] },
    async ({ apiClientNoAuth }) => {
      const response = await apiClientNoAuth.user.loginUser(
        userData.email,
        userData.password
      );

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.user.token).toBeDefined();
      expect(body.user.email).toBe(userData.email);
      expect(body.user.username).toBe(userData.username);
  });
}


for (const { testId, testName, userData, message } of UserData.userDataLoginInvalid()) {
  test(
    `TC-112${testId} unsuccessful login with ${testName}`,
    { tag: ["@user", "@smoke", "@negative"] },
    async ({ apiClientNoAuth }) => {
      const response = await apiClientNoAuth.user.loginUser(
        userData.email,
        userData.password
      );

      expect(response.status()).toBe(422);
      debugPrint(`Response for test ${testId}: ` + JSON.stringify(await response.json()));
      debugPrint(`Expected error for test ${testId}: ` + JSON.stringify(message));
      expect(await response.json()).toEqual({ errors: message });
    }
  );
}