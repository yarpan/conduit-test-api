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

export interface Author {
  username?: string;
  image?: string;
  bio?: string;
  following?: boolean;
}

export interface Profile {
  profile?: Author;
}