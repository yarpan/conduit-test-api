import { APIResponse, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const { EMAIL, USER_NAME, PASSWORD } = process.env;
const messages = {
  exist: "is already taken.",
  empty: "can't be blank",
  invalid: "is invalid",
};

export const user = {
  user: {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.person.firstName(),
  },
};


export const userRegisterParamTests = [
  {
    testId: 1,
    suffix: "with valid data",
    userData: user,
    check: async (response: APIResponse) => {
      expect(response.status()).toBe(200);
      const token = (await response.json()).user.token;
      expect(token).toBeDefined();
    },
  }
];
