import {
    zephyrTableToGraphQLParser
  } from "../utils/parsers";

test('it should parse a valid ZephyrTableOriginal address', () => {
    const data = {
        address: "zephyr_979734a56cb32104e44245cc51e5336e"
    };
    const parsedData = zephyrTableToGraphQLParser(data);
    expect(parsedData).toEqual({ address: "allZephyr979734A56Cb32104E44245Cc51E5336Es" });
});

test('it should throw an error for an invalid ZephyrTableOriginal address', () => {
    const data = {
        address: "invalid_address"
    };
    expect(() => zephyrTableToGraphQLParser(data)).toThrowError("Invalid ZephyrTableOriginal address: invalid_address");
});
