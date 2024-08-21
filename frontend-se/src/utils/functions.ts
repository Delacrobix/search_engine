import { v4 as uuidv4 } from "uuid";

export function getUuidString(): string {
  return uuidv4();
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
