import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { type Character, type CharacterStatus, type CharacterType, type CharacterValue } from "@/models";

export const PADDED_WORDS = 3;

export const calculateCurrentWordIndex = (typedText: string): number => {
    const typedWords = typedText.split(" ");
    return typedWords.length - 1;
};

export const calculateCharacterStatus = (testChar: string, typedChar: string): CharacterStatus => {
    if (testChar === typedChar) {
        return "correct";
    } else if (!typedChar) {
        // if typedChar is empty, user hasn't typed anything for this character
        return "unknown";
    } else {
        return "incorrect";
    }
};

export const createVisibleWordCharacters = (testWord: string, typedWord: string): Character[] => {
    const limit = Math.max(0, testWord.length, typedWord.length);
    const testWordChars = testWord.split("");
    const typedWordChars = typedWord.split("");
    const ret: Character[] = [];

    let currentTestChar: string = "";
    let currentTypedChar: string = "";
    let value: CharacterValue = "";
    let status: CharacterStatus = "unknown";
    const type: CharacterType = "symbol";

    for (let i = 0; i < limit; i++) {
        currentTestChar = testWordChars[i] || "";
        currentTypedChar = typedWordChars[i] || "";

        value = currentTestChar ?? currentTypedChar; // if currentTestChar is empty, use currentTypedChar. The user has input more characters than there should exist for this word
        status = calculateCharacterStatus(currentTestChar, currentTypedChar);

        ret.push({
            value,
            status,
            type,
        });
    }

    return ret;
};

export const calculateVisibleWordData = (
    testText: string,
    typedText: string,
    currentWordIndex: number,
): Character[] => {
    const visibleWords: Character[] = [];
    const testWords = testText.split(" ").slice(0, currentWordIndex + PADDED_WORDS);
    const typedWords = typedText.split(" ");
    let typedWord: string = "";

    testWords.map((testWord, index, { length }) => {
        typedWord = typedWords[index] || "";
        visibleWords.push(...createVisibleWordCharacters(testWord, typedWord));

        // add a space
        if (index < length - 1) {
            visibleWords.push({
                value: " ",
                status: "unknown",
                type: "space",
            });
        }
    });

    return visibleWords;
};

export const useTypingTestStore = defineStore("typingTest", () => {
    const testText = ref("");
    const typedText = ref("");
    const startTime = ref<number | null>(null);
    const endTime = ref<number | null>(null);
    const testStarted = ref(false);
    const testEnded = ref(false);

    // computed
    const currentWordIndex = computed(() => calculateCurrentWordIndex(typedText.value));

    const visibleTextData = computed((): Character[] => {
        return calculateVisibleWordData(testText.value, typedText.value, currentWordIndex.value);
    });

    // actions
    const startTest = () => {
        testStarted.value = true;
        startTime.value = Date.now();
    };

    const endTest = () => {
        testEnded.value = true;
        endTime.value = Date.now();
    };

    const resetTest = () => {
        testText.value = "";
        typedText.value = "";
        startTime.value = null;
        endTime.value = null;
        testStarted.value = false;
        testEnded.value = false;
    };

    return {
        startTime,
        endTime,
        testStarted,
        testEnded,
        // computed
        visibleTextData,
        // actions
        startTest,
        endTest,
        resetTest,
    };
});
