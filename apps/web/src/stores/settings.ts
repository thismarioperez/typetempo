import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { LanguageCode, Settings, SettingsTheme, SettingsWordLimit } from "@/models";

export const useSettingsStore = defineStore("settings", () => {
    const theme = ref<SettingsTheme>("dark");
    const language = ref<LanguageCode>("en");
    const wordLimit = ref<SettingsWordLimit>("50");

    const settings: Record<string, Ref<unknown>> = {
        theme,
        language,
        wordLimit,
    };

    const updateSettings = (newSettings: Partial<Settings>) => {
        Object.entries(newSettings).forEach(([key, value]) => {
            settings[key].value = value;
        });
    };

    return {
        // state
        theme,
        language,
        wordLimit,

        // actions
        updateSettings,
    };
});
