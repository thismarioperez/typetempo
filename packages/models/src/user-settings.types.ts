import { type UserSettings as BaseUserSettings } from "@typetempo/db";

export type UserSettings = Partial<BaseUserSettings>;

export type UserSettingsResponse = {
    message: string;
    userSettings: Pick<UserSettings, "theme" | "language" | "wordLimit">;
};
