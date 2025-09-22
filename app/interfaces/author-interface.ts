export interface Author {
  username?: string;
  image?: string;
  bio?: string;
  following?: boolean;
}

export interface Profile {
  profile?: Author;
}
