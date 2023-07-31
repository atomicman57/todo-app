export function isNullOrWhitespace(name?: string): boolean {
  return !name || name.trim().length === 0
}
