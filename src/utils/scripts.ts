export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();

  return `${month} ${year}`;
}

export function plural(count: number, word: string): string {
  const value = count === 1 ? word : `${word}s`;
  return value;
}

export function getRating(rating: number): string {
  const rounded = Math.round(rating);
  const clamped = Math.min(Math.max(rounded, 0), 5);
  return `${(clamped / 5) * 100}%`;
}
