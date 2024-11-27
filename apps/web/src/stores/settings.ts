import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import type { Settings } from "@/models";
import { DEFAULT_SETTINGS } from "@/models";

export const useSettingsStore = defineStore("settings", () => {
    const settings = ref(reactive<Settings>(DEFAULT_SETTINGS));

    const updateSettings = (newSettings: Partial<Settings>) => {
        Object.entries(newSettings).forEach(([key, value]) => {
            // @ts-ignore
            settings.value[key] = value;
        });
    };

    return {
        // state
        settings,

        // actions
        updateSettings,
    };
});
