// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeEmptyProperty(payload: Record<string, any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.keys(payload).reduce((acc: Record<string, any>, key) => {
    if (payload[key]) acc[key] = payload[key];
    return acc;
  }, {});
}

export function wordCapitalize(words: string) {
  return words
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
