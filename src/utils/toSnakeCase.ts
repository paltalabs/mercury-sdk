export const toSnakeCase = <T extends Record<string, any>>(obj: T): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      return [snakeKey, value];
    }),
  );
};
