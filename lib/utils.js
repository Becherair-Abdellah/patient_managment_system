import { twMerge } from "tailwind-merge";
import clsx from "clsx";
export function cn(...inputs) {
    return twMerge(clsx(inputs));
  }
  export function encryptKey(passkey) {
    return btoa(passkey);
  }
  
  export function decryptKey(passkey) {
    return atob(passkey);
  }