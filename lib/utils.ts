import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function generateAccountNumber(): string {
  return Math.floor(Math.random() * 10000000000)
    .toString()
    .padStart(10, "0")
}

export function generateTransactionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function calculateInterest(principal: number, rate: number, time: number): number {
  // Simple interest calculation: P * R * T / 100
  return (principal * rate * time) / 100
}

