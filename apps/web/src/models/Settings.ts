import { LANGUAGE_CODES } from "./Language";

export const THEMES = ["light", "dark"] as const;
export const WORD_LIMITS = [10, 20, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500] as const;

export type Settings = {
    theme: SettingsTheme;
    language: SettingsLanguage;
    wordLimit: SettingsWordLimit;
};

export type SettingsTheme = (typeof THEMES)[number];
export type SettingsLanguage = (typeof LANGUAGE_CODES)[number];
export type SettingsWordLimit = (typeof WORD_LIMITS)[number];

export const DEFAULT_SETTINGS: Settings = {
    theme: "dark",
    language: "en",
    wordLimit: 20,
};
