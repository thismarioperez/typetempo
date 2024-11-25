import { describe, it, expect } from "vitest";
import { shuffleArray } from "../../src/util/array";

describe("util/array", () => {
    describe("shuffleArray", () => {
        it("should return an array of the same length as the input", () => {
            const array = [1, 2, 3, 4, 5];
            const result = shuffleArray(array);

            expect(result.length).toBe(array.length);
        });

        it("should return an array with the same elements as the input", () => {
            const array = [1, 2, 3, 4, 5];
            const result = shuffleArray(array);

            expect(result).toEqual(expect.arrayContaining(array));
        });

        it("should return an array with the same elements in a different order", () => {
            const array = [1, 2, 3, 4, 5];
            const result = shuffleArray(array);

            expect(result).not.toEqual(array);
        });
    });
});
