import { Redis } from "@upstash/redis";

export function redis() {
  return Redis.fromEnv();
}

