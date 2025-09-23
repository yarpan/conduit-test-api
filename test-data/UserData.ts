import { faker } from "@faker-js/faker";
import { getUserCredentials } from "../helpers/env.helper";
import { generateRandomString } from "../helpers/data.helper";

//const { USER_EMAIL, USER_NAME, USER_PASSWORD } = getUserCredentials();


const { USER_EMAIL, USER_NAME, USER_PASSWORD } = getUserCredentials();

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


  static userDataRegisterValid() {
    return [
      {
        testId: 1,
        testName: "valid random data",
        userData: {
          user: {
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.person.firstName(),
          },
        }
      },
      {
        testId: 2,
        testName: "short email",
        userData: {
          user: {
            email: generateRandomString(1)+"@"+generateRandomString(1)+"."+generateRandomString(3),
            password: faker.internet.password(),
            username: faker.person.firstName(),
          },
        }
      },
      {
        testId: 3,
        testName: "long username",
        userData: {
          user: {
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: generateRandomString(100),
          },
        }
      },



    ];
  }


  static userDataRegisterInvalid() {
    return [
      {
        testId: 1,
        testName: "username exist",
        userData: {
          user: {
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: USER_NAME,
          },
        },
        message: {
          "username": "is already taken."
        }
      },
      {
        testId: 2,
        testName: "email exist",
        userData: {
          user: {
            email: USER_EMAIL,
            password: faker.internet.password(),
            username: faker.person.firstName(),
          },
        },
        message: {
          "email": "is already taken."
        }
      },
      {
        testId: 3,
        testName: "username is empty",
        userData: {
          user: {
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: "",
          },
        },
        message: {
          "username": "can't be blank"
        }
      },
      {
        testId: 4,
        testName: "email is empty",
        userData: {
          user: {
            email: "",
            password: faker.internet.password(),
            username: faker.person.firstName(),
          },
        },
        message: {
          "email": "can't be blank"
        }
      },
      {
        testId: 5,
        testName: "email is invalid",
        userData: {
          user: {
            email: faker.person.firstName(),
            password: faker.internet.password(),
            username: faker.person.firstName(),
          },
        },
        message: {
          "email": "is invalid"
        }
      },
      {
        testId: 6,
        testName: "username is invalid",
        userData: {
          user: {
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.email(),
          },
        },
        message: {
          "username": "is invalid"
        }
      }
    ];
  }




  static userDataLoginValid() {
    return [
      {
        testId: 1,
        testName: "valid credentials for user-1",
        userData: {
          email: USER_EMAIL,
          password: USER_PASSWORD,
          username: USER_NAME
        }
      }
    ];
  }



  static userDataLoginInvalid() {
    return [
      {
        testId: 1,
        testName: "with wrong password",
        userData: {
          email: USER_EMAIL,
          password: faker.internet.password(),
        },
        message: {
          "email or password": "is invalid"
        }
      },
      {
        testId: 2,
        testName: "with non-existing user",
        userData: {
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
        message: {
          "email or password": "is invalid"
        }
      },
      {
        testId: 3,
        testName: "with empty email",
        userData: {
          email: "",
          password: USER_PASSWORD,
        },
        message: {
          "email": "can't be blank"
        }
      },
      {
        testId: 4,
        testName: "with empty password",
        userData: {
          email: USER_EMAIL,
          password: "",
        },
        message: {
          "password": "can't be blank"
        }
      }
    ]
  }




}