import { expect, test } from "../../fixtures/fixtures";
import { debugPrint } from "../../helpers/debug.helper";
import { UserData } from "../../test-data/UserData";

test.describe("User signup", () => {

  for (const { testId, testName, userData } of UserData.getValidDataForRegistration()) {
    test(`TC-101${testId} successful registration with ${testName}`,
      { tag: ["@user", "@crud"] },
      async ({ apiClientNoAuth }) => {
        const response = await apiClientNoAuth.user.createUser(userData);

        debugPrint("registering user with data: " + JSON.stringify(userData));
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.user.token).toBeDefined();
        expect(body.user.email).toBe(userData.user.email);
        expect(body.user.username).toBe(userData.user.username);
      }
    );
  }

  for (const { testId, testName, userData, message } of UserData.getInvalidDataForRegistration()) {
    test(`TC-102${testId} unsuccessful registration with ${testName}`,
      { tag: ["@user", "@negative"] },
      async ({ apiClientNoAuth }) => {
        const response = await apiClientNoAuth.user.createUser(userData);

        expect(response.status()).toBe(422);
        debugPrint(`Response for test ${testId}: ` + JSON.stringify(await response.json()));
        debugPrint(`Expected error for test ${testId}: ` + JSON.stringify(message));
        expect(await response.json()).toEqual({ errors: message });
      }
    )
  }
});