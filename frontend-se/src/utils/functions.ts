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

export function millisecondsToMinutes(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds}`;
}
