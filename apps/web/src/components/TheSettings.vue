<script setup lang="ts">
import { THEMES, LANGUAGE_CODES_TO_NAME, WORD_LIMITS, type Settings } from "@/models";
import { useSettingsStore } from "@/stores/settings";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import TheAuthForms from "./TheAuthForms.vue";

const { settings } = storeToRefs(useSettingsStore());

const { updateSettings } = useSettingsStore();

const form = ref<HTMLFormElement | null>(null);

const data = ref({
    THEMES,
    LANGUAGE_CODES_TO_NAME,
    WORD_LIMITS,
});

const handleChange = () => {
    if (!form.value) {
        return;
    }
    const newSettings = new FormData(form.value) as unknown as Settings;
    updateSettings(newSettings);
};
</script>

<template>
    <div class="wrapper">
        <h1>Settings</h1>
        <form class="form" ref="form" @change="handleChange">
            <div class="inputs">
                <label for="theme">
                    <span>Theme: </span>
                    <select name="theme" id="theme" v-model="settings.theme">
                        <option v-for="theme in data.THEMES" :key="theme" :value="theme">
                            {{ theme }}
                        </option>
                    </select>
                </label>
                <label for="language">
                    <span>Language: </span>
                    <select name="language" id="language" v-model="settings.language">
                        <option
                            v-for="entry in Object.entries(data.LANGUAGE_CODES_TO_NAME)"
                            :key="entry[0]"
                            :value="entry[0]"
                        >
                            {{ entry[1] }}
                        </option>
                    </select>
                </label>
                <label for="wordLimit">
                    <span>Word Limit: </span>
                    <select name="wordLimit" id="wordLimit" v-model.number="settings.wordLimit">
                        <option v-for="wordLimit in data.WORD_LIMITS" :key="wordLimit" :value="wordLimit">
                            {{ wordLimit }}
                        </option>
                    </select>
                </label>
            </div>
        </form>
        <TheAuthForms />
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 8rem;
}
.inputs {
    display: flex;
    flex-flow: column;
}
</style>
