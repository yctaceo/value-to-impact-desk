import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function moneyLabel(value?: string) {
  return value ?? "Amount to be confirmed";
}
