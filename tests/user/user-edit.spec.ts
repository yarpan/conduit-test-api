import { expect, test } from "../../fixtures/fixtures";
import { debugPrint } from "../../helpers/debug.helper";
import { getEnvUserCredentials } from "../../helpers/env.helper";
import { UserData } from "../../test-data/UserData";
import { UserSchemas } from "../../app/schemas/UserSchemas";

test.describe("User edit", () => {

  test("TC-1131 edit user",
    { tag: ["@user", "@schema"] },
    async ({ apiClientAuth }) => {
      // get user initial info
      const profileResponse = await apiClientAuth.user.getUserProfile(getEnvUserCredentials().USER_NAME);
      const profileBefore = await profileResponse.json();
      debugPrint("Profile before update: " + JSON.stringify(profileBefore));
 
      // edit user
      const editResponse = await apiClientAuth.user.editUser(UserData.getDataForUpdateUser());
      expect(editResponse.status()).toBe(200);
      const editResponseJson = await editResponse.json();
      debugPrint("Profile after update: " + JSON.stringify(editResponseJson));

      // validations
      // expect(editResponseJson.user.email).not.toEqual(profileBefore.profile.email);
      // expect(editResponseJson.user.username).not.toEqual(profileBefore.profile.username);
      expect(editResponseJson.user.bio).not.toEqual(profileBefore.profile.bio);
      expect(editResponseJson.user.image).not.toEqual(profileBefore.profile.image);
      const editResults = UserSchemas.UserResponse.validate(editResponseJson);
      expect(editResults.error).toBeUndefined();
    })
});