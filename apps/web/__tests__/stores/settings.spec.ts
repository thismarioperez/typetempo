import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSettingsStore } from "../../src/stores/settings";
import { Settings } from "../../src/models/Settings";

beforeEach(() => {
    setActivePinia(createPinia());
});

const testSettings: Settings = {
    language: "es",
    theme: "light",
    wordLimit: 200,
};

describe("Settings Store", () => {
    Object.entries(testSettings).forEach(([key, value]) => {
        it(`should set ${key} to ${value}`, () => {
            const store = useSettingsStore();
            store.updateSettings({ [key]: value });
            expect(store[key]).toBe(value);
        });
    });
});
