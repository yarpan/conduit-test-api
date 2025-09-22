export function getUserCredentials() {
  const { USER_EMAIL, USER_NAME, USER_PASSWORD } = process.env;

  if (!USER_EMAIL || !USER_PASSWORD || !USER_NAME) {
    throw new Error("USER_EMAIL, USER_NAME and USER_PASSWORD environment variables must be defined.");
  }

  return { USER_EMAIL, USER_NAME, USER_PASSWORD };
}
