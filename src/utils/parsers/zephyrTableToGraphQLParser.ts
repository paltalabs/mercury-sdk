import { ZephyrTableOriginal, ZephyrTableGraphQL } from "../../types";
/**
 * Parses ZephyrTableOriginal to ZephyrTableGraphQL
 * @param data - ZephyrTableOriginal
 * @returns ZephyrTableGraphQL
 * @throws Will throw an error if the address is invalid
 * @beta
 * @example
 * ```ts
 * const data: ZephyrTableOriginal = {
 *  address: "zephyr_979734a56cb32104e44245cc51e5336e"
 * }
 * const parsedData = zephyrTableToGraphQLParser(data);
 * console.log(parsedData);
 * // Output: { address: "allZephyr979734A56Cb32104E44245Cc51E5336Es" }
 * ```
 */
export const zephyrTableToGraphQLParser = (data: ZephyrTableOriginal): ZephyrTableGraphQL => {
  const zephyrRegex = /^zephyr_[a-f0-9]{32}$/;

  if (zephyrRegex.test(data.address)) {
    const newAddress = data.address.replace("zephyr_", "");
    const segments = newAddress.match(/[A-Za-z]+|[0-9]+/g);
    const capitalizedSegments = segments?.map(
      (segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1),
    );
    const capitalizedAddress = capitalizedSegments?.join("");
    const prefixAddress = `allZephyr${capitalizedAddress}`;
    let parsedZephyrAddress = prefixAddress;
    const lastCharacter = parsedZephyrAddress.charAt(parsedZephyrAddress.length - 1);
    if (isNaN(Number(lastCharacter))) {
      parsedZephyrAddress += "s";
    } else {
      parsedZephyrAddress += "S";
    }

    return { address: parsedZephyrAddress };
  } else {
    throw new Error(`Invalid ZephyrTableOriginal address: ${data.address}`);
  }
};
