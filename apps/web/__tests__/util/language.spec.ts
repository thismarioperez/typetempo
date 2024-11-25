import { expect, describe, it } from "vitest";
import { LanguageSchema } from "../../src/models/Language";

import { getLanguageByCode, getShuffledWordsByCode } from "../../src/util/language";

describe("util/language", () => {
    describe("getLanguageByCode", () => {
        it("should return a valid language object if the code is valid", () => {
            const result = getLanguageByCode("en");

            expect(result).toBeDefined();
            expect(LanguageSchema.safeParse(result).success).toBe(true);
        });

        it("should return the expected language object if the code is valid", () => {
            const result = getLanguageByCode("en");

            expect(result).toBeDefined();
            expect(result.code).toBe("en");
            expect(result.name).toMatch(/english/i);
        });

        it("should throw an error if the code is invalid", () => {
            const result = () => getLanguageByCode("invalid");

            expect(result).toThrowError("Invalid language code");
        });
    });

    describe("getShuffledWordsByCode", () => {
        it("should return an array of shuffled words if the code is valid", () => {
            const result = getShuffledWordsByCode("en");
            const original = getLanguageByCode("en").words;

            expect(result).toBeDefined();
            expect(result.length).toBe(original.length);
            expect(result).not.toEqual(original);
        });

        it("should limit the number of words acording to the count parameter", () => {
            const result = getShuffledWordsByCode("en", 10);

            expect(result).toBeDefined();
            expect(result.length).toBe(10);
        });

        it("should throw an error if the code is invalid", () => {
            const result = () => getShuffledWordsByCode("invalid");

            expect(result).toThrowError("Invalid language code");
        });
    });
});
