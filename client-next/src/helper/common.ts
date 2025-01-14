// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeEmptyProperty(payload: Record<string, any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.keys(payload).reduce((acc: Record<string, any>, key) => {
    if (payload[key]) acc[key] = payload[key];
    return acc;
  }, {});
}
