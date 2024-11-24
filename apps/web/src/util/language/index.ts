import type { Language, LanguageCode } from "@/models/Language";
import { shuffleArray } from "../array";
import es from "../../language/es.json";
import en from "../../language/en.json";

export const getLanguageByCode = (code: LanguageCode): Language => {
    switch (code) {
        case "es":
            return es as Language;
        case "en":
            return en as Language;
        default:
            throw new Error("Invalid language code");
    }
};

export const getShuffledWordsByCode = (code: LanguageCode, count?: number): string[] => {
    let words = shuffleArray(getLanguageByCode(code)?.words || []);

    if (count) {
        words = words.slice(0, count);
    }

    return words;
};
