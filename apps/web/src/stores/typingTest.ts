import { ref, computed, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { type Character, type CharacterStatus, type CharacterType, type CharacterValue } from "@/models";
import { getShuffledWordsByCode } from "@/util/language";
import { useSettingsStore } from "./settings";

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

    // loop through the characters of the word
    let currentTestChar: string = "";
    let currentTypedChar: string = "";
    let currentTestCharIsEmpty: boolean = false;
    let value: CharacterValue = "";
    let status: CharacterStatus = "unknown";
    const type: CharacterType = "symbol";

    for (let i = 0; i < limit; i++) {
        currentTestChar = testWordChars[i] || "";
        currentTypedChar = typedWordChars[i] || "";
        currentTestCharIsEmpty = currentTestChar.length === 0;

        value = currentTestCharIsEmpty ? currentTypedChar : currentTestChar; // if currentTestChar is empty, use currentTypedChar. The user has input more characters than there should exist for this word
        status = calculateCharacterStatus(currentTestChar, currentTypedChar);

        ret.push({
            id: crypto.randomUUID(),
            value,
            status,
            type,
        });
    }

    return ret;
};

export const PADDED_WORDS = 3;

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
                id: crypto.randomUUID(),
                value: " ",
                status: "unknown",
                type: "space",
            });
        }
    });

    return visibleWords;
};

export const calculateCompletedWords = (testText: string, typedText: string): number => {
    const testWords = testText.split(" ");
    const typedWords = typedText.split(" ");

    let completedWords = 0;
    let typedLength = 0;

    let testWord = "";
    let remainingTypedText = "";
    let nextTypedWord = "";

    for (let i = 0; i < typedWords.length; i++) {
        // Guard if the typed text is longer than the test text. Stop here
        if (typedLength >= typedText.length) break;

        testWord = testWords[i];
        remainingTypedText = typedText.slice(typedLength).trim();

        // Match the next typed word up to the test word's length or further
        nextTypedWord = remainingTypedText.split(" ")[0];
        if (nextTypedWord.length >= testWord.length) {
            completedWords++;
        }

        // Update the length of typed text processed so far
        typedLength += nextTypedWord.length + 1; // +1 accounts for the space
    }

    return completedWords;
};

export const calculateWPM = (startTime: number, endTime: number, wordsTyped: number): number => {
    if (startTime > endTime) {
        throw new Error("Start time cannot be greater than end time");
    }

    if (wordsTyped <= 0) {
        return 0;
    }

    const elapsedTime = endTime - startTime;
    const minutes = elapsedTime / 1000 / 60;
    const wpm = Math.round(wordsTyped / minutes);

    return wpm;
};

export const useTypingTestStore = defineStore("typingTest", () => {
    // external state
    const { settings } = storeToRefs(useSettingsStore());
    const { language, wordLimit } = settings.value;

    // state
    const testText = ref(getShuffledWordsByCode(language, wordLimit).join(" "));
    const typedText = ref("");
    const startTime = ref<number | null>(null);
    const endTime = ref<number | null>(null);
    const testStarted = ref(false);
    const testEnded = ref(false);

    // computed
    const currentWordIndex = computed(() => calculateCurrentWordIndex(typedText.value));
    const cursorIndex = computed(() => {
        return typedText.value.length;
    });

    const visibleTextData = computed((): Character[] =>
        calculateVisibleWordData(testText.value, typedText.value, currentWordIndex.value),
    );

    const wordsTyped = computed(() => {
        const typedWords = calculateCompletedWords(testText.value, typedText.value);
        return typedWords;
    });

    const wpm = computed(() => {
        if (testStarted.value) {
            if (testEnded.value) {
                return calculateWPM(startTime.value!, endTime.value!, wordsTyped.value);
            }
            return calculateWPM(startTime.value!, Date.now(), wordsTyped.value);
        }
        return 0;
    });

    const errorsCount = computed(() => {
        return visibleTextData.value.filter((char) => char.status === "incorrect").length;
    });

    // actions
    const startTest = () => {
        testStarted.value = true;
        startTime.value = Date.now();
    };

    const endTest = () => {
        console.log("Test ended");
        testEnded.value = true;
        endTime.value = Date.now();
    };

    const resetTest = () => {
        testText.value = getShuffledWordsByCode(language, wordLimit).join(" ");
        typedText.value = "";
        startTime.value = null;
        endTime.value = null;
        testStarted.value = false;
        testEnded.value = false;
    };

    return {
        // external state - don't actually use these
        settings,
        // state
        testText,
        typedText,
        startTime,
        endTime,
        testStarted,
        testEnded,
        // computed
        cursorIndex,
        currentWordIndex,
        visibleTextData,
        wordsTyped,
        wpm,
        errorsCount,
        // actions
        startTest,
        endTest,
        resetTest,
    };
});
