function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();

  return `${month} ${year}`;
}

function plural(count: number, word: string): string {
  const value = count === 1 ? word : `${word}s`;
  return value;
}

export {capitalize, formatDate, plural};
