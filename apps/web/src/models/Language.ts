import z from "zod";

export const LANGUAGE_CODES = ["en", "es"] as const;

export const LANGUAGE_CODES_TO_NAME: Record<LanguageCode, LanguageName> = {
    en: "english",
    es: "spanish",
};

export const LanguageSchema = z.object({
    name: z.string(),
    code: z.enum(LANGUAGE_CODES),
    description: z.string(),
    words: z.array(z.string()),
});

export type Language = z.infer<typeof LanguageSchema>;

export type LanguageCode = Language["code"];

export type LanguageName = Language["name"];

export type LanguageDescription = Language["description"];

export type LanguageWords = Language["words"];
