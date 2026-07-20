import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Funcion para obetner la URL de la imagen con timestamp para eviart cache
export const getImageUrl = (url: string) => {
  if (!url) return ''
  // Agregar timestamp para evitar cache
  return `${url}?=${new Date().getTime()}`
}