import { faker } from "@faker-js/faker";

const { EMAIL, USER_NAME, PASSWORD } = process.env;
const messages = {
  exist: "is already taken.",
  empty: "can't be blank",
  invalid: "is invalid",
};

export class UserData {

  // const user = {
  //   user: {
  //     email: faker.internet.email(),
  //     password: faker.internet.password(),
  //     username: faker.person.firstName(),
  //   },
  // };

  // const userUpdateData = {
  //   user: {
  //     bio: faker.person.bio(),
  //     image: faker.image.avatar(),
  //   },
  // };

  static userDataLoginValid() {
    return [
      {
        testId: 1,
        suffix: "with valid credentials",
        credentials: {
          email: EMAIL,
          password: PASSWORD,
        }
      }
    ];
  }



  static userDataLoginInvalid() {
    return [
      {
        testId: 2,
        suffix: "with wrong password",
        credentials: {
          email: EMAIL,
          password: faker.internet.password(),
        }
      },
      {
        testId: 3,
        suffix: "with non-existing user",
        credentials: {
          email: faker.internet.email(),
          password: faker.internet.password(),
        }
      },
      {
        testId: 4,
        suffix: "with empty email",
        credentials: {
          email: "",
          password: PASSWORD,
        }
      },
      {
        testId: 5,
        suffix: "with empty password",
        credentials: {
          email: EMAIL,
          password: "",
        }
      }
    ]
  }




}