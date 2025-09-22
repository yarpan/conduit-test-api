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

export const userUpdateData = {
  user: {
    bio: faker.person.bio(),
    image: faker.image.avatar(),
  },
};

export const userLoginParamTests = [
  {
    testId: 1,
    suffix: "with valid credentials",
    credentials: {
      email: EMAIL,
      password: PASSWORD,
    },
    check: async (response: APIResponse) => {
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.user.token).toBeDefined();
      expect(body.user.email).toBe(EMAIL);
    },
  },
  {
    testId: 2,
    suffix: "with wrong password",
    credentials: {
      email: EMAIL,
      password: faker.internet.password(),
    },
    check: async (response: APIResponse) => {
      expect(response.status()).toBe(422);
      const errMsg = (await response.json()).errors["email or password"];
      expect(errMsg).toEqual(messages.invalid);
    },
  },
  {
    testId: 3,
    suffix: "with non-existing user",
    credentials: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
    check: async (response: APIResponse) => {
      expect(response.status()).toBe(422);
      const errMsg = (await response.json()).errors["email or password"];
      expect(errMsg).toEqual(messages.invalid);
    },
  },
  {
    testId: 4,
    suffix: "with empty email",
    credentials: {
      email: "",
      password: PASSWORD,
    },
    check: async (response: APIResponse) => {
      expect(response.status()).toBe(422);
      const errMsg = (await response.json()).errors.email;
      expect(errMsg).toEqual(messages.empty);
    },
  },
  {
    testId: 5,
    suffix: "with empty password",
    credentials: {
      email: EMAIL,
      password: "",
    },
    check: async (response: APIResponse) => {
      expect(response.status()).toBe(422);
      const errMsg = (await response.json()).errors.password;
      expect(errMsg).toEqual(messages.empty);
    },
  },
];
