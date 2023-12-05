import path from "path";
import * as fs from "fs";
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

export const getMutationFromFile = (name: string) => {
  const mutationPath = path.join(
    __dirname,
    `./graphql/mutations/${name}.graphql`
  );
  const mutation = fs.readFileSync(mutationPath, "utf8");
  return mutation;
};

export const getQueryFromFile = (name: string) => {
  const queryPath = path.join(__dirname, `./graphql/queries/${name}.graphql`);
  const query = fs.readFileSync(queryPath, "utf8");
  return query;
};
