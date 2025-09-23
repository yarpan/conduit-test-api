import randomstring from 'randomstring';

export function generateRandomString(length: number = 10): string {
  return randomstring.generate(length);
}

export function generateRandomNumber(min: number = 1, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}