import axios from "axios";

export const createAxiosInstance = (url: string, token: string) => {
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

export const toSnakeCase = <T extends Record<string, any>>(
  obj: T
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      return [snakeKey, value];
    })
  );
};
