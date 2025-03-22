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
  // Enhanced interest calculation for 2025 with compound interest
  // Using the formula: A = P(1 + r/n)^(nt) - P
  // Where A is the interest, P is principal, r is rate, n is compounding frequency (12 for monthly), t is time in years
  const compoundingFrequency = 12 // Monthly compounding
  const rateDecimal = rate / 100

  const finalAmount = principal * Math.pow(1 + rateDecimal / compoundingFrequency, compoundingFrequency * time)
  const interest = finalAmount - principal

  return interest
}

