import { clsx } from "clsx";   //ye utils file h jiska kaam h class ko merge krna 
import { twMerge } from "tailwind-merge";   //ye wali line bhi class ko merge krne ke liye h 


export function cn(...inputs) {   //ye function clsx and twMerge ko use krke class ko merge krta h jiska kaam h class ko merge krna  aur ui ko smooth banana 
  return twMerge(clsx(inputs));
}
