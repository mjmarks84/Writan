export const wordCount = (value: string): number =>
  value.trim().split(/\s+/).filter(Boolean).length;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
