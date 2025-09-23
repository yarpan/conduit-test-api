import randomstring from 'randomstring';

export function generateRandomString(length: number = 8): string {
  return randomstring.generate(length).toLowerCase();
}