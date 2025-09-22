export interface User {
  user?: {
    email?: string;
    password?: string;
    username?: string;
    image?: string;
    bio?: string;
  };
}

export interface UserCredentials {
  email: string;
  password: string;
  username: string;
}