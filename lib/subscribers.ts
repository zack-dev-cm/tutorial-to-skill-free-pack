export const subscribersSetKey = "tutorial-to-skill:subscribers";

export function subscriberKey(email: string) {
  return `tutorial-to-skill:subscriber:${email}`;
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

