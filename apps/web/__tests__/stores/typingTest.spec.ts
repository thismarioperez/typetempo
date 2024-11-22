import { describe, it, expect } from "vitest";
import type { Character } from "../../src/models";
import {
    calculateCurrentWordIndex,
    calculateCharacterStatus,
    createVisibleWordCharacters,
    calculateVisibleWordData,
    PADDED_WORDS,
} from "../../src/stores/typingTest";

describe("Typing Test Store", () => {
    describe("calculateCurrentWordIndex", () => {
        it("should return the index of the last word typed", () => {
            const typedText = "hello world";
            const index = calculateCurrentWordIndex(typedText);

            expect(typedText.split(" ")[index]).toBe("world");
        });
    });

    describe("calculateCharacterStatus", () => {
        it("should return a correct status when characters match", () => {
            const testChar = "a";
            const typedChar = "a";
            const result = calculateCharacterStatus(testChar, typedChar);

            expect(result).toBe("correct");
        });

        it("should return an incorrect status when characters don't match", () => {
            const testChar = "a";
            const typedChar = "b";
            const result = calculateCharacterStatus(testChar, typedChar);

            expect(result).toBe("incorrect");
        });

        it("should return an unknown status when typedChar is empty", () => {
            const testChar = "a";
            const typedChar = "";
            const result = calculateCharacterStatus(testChar, typedChar);

            expect(result).toBe("unknown");
        });
    });

    describe("createVisibleWordCharacters", () => {
        it("should detect correct characters", () => {
            const testText = "hello";
            const typedText = "hello";
            const output: Character[] = [
                { value: "h", status: "correct", type: "symbol" },
                { value: "e", status: "correct", type: "symbol" },
                { value: "l", status: "correct", type: "symbol" },
                { value: "l", status: "correct", type: "symbol" },
                { value: "o", status: "correct", type: "symbol" },
            ];

            const result = createVisibleWordCharacters(testText, typedText);

            expect(result).toEqual(output);
        });

        it("should detect incorrect characters, even if some are correct", () => {
            const testText = "hello";
            const typedText = "world";
            const output: Character[] = [
                { value: "h", status: "incorrect", type: "symbol" },
                { value: "e", status: "incorrect", type: "symbol" },
                { value: "l", status: "incorrect", type: "symbol" },
                { value: "l", status: "correct", type: "symbol" },
                { value: "o", status: "incorrect", type: "symbol" },
            ];

            const result = createVisibleWordCharacters(testText, typedText);

            expect(result).toEqual(output);
        });

        it("should detect unknown characters", () => {
            const testText = "hello";
            const typedText = "";
            const output: Character[] = [
                { value: "h", status: "unknown", type: "symbol" },
                { value: "e", status: "unknown", type: "symbol" },
                { value: "l", status: "unknown", type: "symbol" },
                { value: "l", status: "unknown", type: "symbol" },
                { value: "o", status: "unknown", type: "symbol" },
            ];

            const result = createVisibleWordCharacters(testText, typedText);

            expect(result).toEqual(output);
        });
    });

    describe("calculateVisibleWordData", () => {
        it("should return an empty array if no words are provided", () => {
            const testText = "";
            const typedText = "";
            const currentWordIndex = 0;
            const result = calculateVisibleWordData(testText, typedText, currentWordIndex);

            expect(result).toEqual([]);
        });

        it("should return an array of characters", () => {
            const testText = "hello world";
            const typedText = "hello";
            const output: Character[] = [
                { value: "h", status: "correct", type: "symbol" },
                { value: "e", status: "correct", type: "symbol" },
                { value: "l", status: "correct", type: "symbol" },
                { value: "l", status: "correct", type: "symbol" },
                { value: "o", status: "correct", type: "symbol" },
                { value: " ", status: "unknown", type: "space" },
                { value: "w", status: "unknown", type: "symbol" },
                { value: "o", status: "unknown", type: "symbol" },
                { value: "r", status: "unknown", type: "symbol" },
                { value: "l", status: "unknown", type: "symbol" },
                { value: "d", status: "unknown", type: "symbol" },
            ];
            const currentWordIndex = 0;
            const result = calculateVisibleWordData(testText, typedText, currentWordIndex);

            expect(result).toEqual(output);
        });

        it(`should add ${PADDED_WORDS} words before the current word`, () => {
            const testText = "hello world with extra words";
            const typedText = "hello";
            const currentWordIndex = 1;
            const output = testText
                .split(" ")
                .slice(0, PADDED_WORDS + currentWordIndex)
                .join(" ")
                .split("").length;

            const result = calculateVisibleWordData(testText, typedText, currentWordIndex);

            expect(result).toHaveLength(output);
        });
    });
});
