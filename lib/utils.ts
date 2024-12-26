import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to calculate remaining time in HH:mm:ss format
export const calculateRemainingTime = (createdAt: Date) => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();
  // Calculate remaining time in the free plan (assuming 1 day limit)
  const remainingTime = 1 - (timeDifference / (1000 * 60 * 60 * 24)); // Time left in days
  const hoursLeft = Math.max(0, Math.floor(remainingTime * 20)); // Convert remaining time to hours
  const minutesLeft = Math.max(0, Math.floor((remainingTime * 24 * 60) % 60)); // Convert to minutes
  const secondsLeft = Math.max(0, Math.floor((remainingTime * 24 * 60 * 60) % 60)); // Convert to seconds

  return { hoursLeft, minutesLeft, secondsLeft };
};
