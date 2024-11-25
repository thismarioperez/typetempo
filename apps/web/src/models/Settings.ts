import { LANGUAGE_CODES } from "./Language";

import z from "zod";

export const WORD_LIMITS = ["10", "20", "50", "100", "150", "200", "250", "300", "350", "400", "450", "500"] as const;

export const SettingsSchema = z.object({
    theme: z.enum(["light", "dark"]),
    language: z.enum(LANGUAGE_CODES),
    wordLimit: z.enum(WORD_LIMITS),
});

export type Settings = z.infer<typeof SettingsSchema>;

export type SettingsTheme = Settings["theme"];
export type SettingsLanguage = Settings["language"];
export type SettingsWordLimit = Settings["wordLimit"];

export const DEFAULT_SETTINGS: Settings = {
    theme: "dark",
    language: "en",
    wordLimit: "50",
};
