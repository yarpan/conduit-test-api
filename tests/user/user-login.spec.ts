import { expect, test } from "../../fixtures/fixtures";
import { debugPrint } from "../../helpers/debug.helper";
import { UserData } from "../../test-data/UserData";

test.describe("User login", () => {

  for (const { testId, testName, userData } of UserData.getValidDataForLogin()) {
    test(`TC-111${testId} successful login with ${testName}`,
      { tag: ["@user"] },
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

  for (const { testId, testName, userData, message } of UserData.getInvalidDataForLogin()) {
    test(`TC-112${testId} unsuccessful login with ${testName}`,
      { tag: ["@user", "@negative"] },
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
});