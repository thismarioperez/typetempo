import z from "zod";

export const LanguageCodes = ["en", "es"] as const;

export const LanguageSchema = z.object({
    name: z.string(),
    code: z.enum(LanguageCodes),
    description: z.string(),
    words: z.array(z.string()),
});

export type Language = z.infer<typeof LanguageSchema>;

export type LanguageCode = Language["code"];

export type LanguageName = Language["name"];

export type LanguageDescription = Language["description"];

export type LanguageWords = Language["words"];
