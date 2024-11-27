<script lang="ts" setup>
import ItemChar from "@/components/TheTypingTest/ItemChar.vue";
import { useSettingsStore } from "@/stores/settings";
import { useTypingTestStore } from "@/stores/typingTest";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";

const typingTestStore = useTypingTestStore();
const {
    // actions
    startTest,
    endTest,
    resetTest,
} = typingTestStore;

const { settings } = storeToRefs(useSettingsStore());

const { wordLimit } = settings.value;

const {
    cursorIndex,
    currentWordIndex,
    visibleTextData,
    testText,
    typedText,
    wpm,
    testStarted,
    testEnded,
    wordsTyped,
    errorsCount,
} = storeToRefs(typingTestStore);

const textInput = ref<HTMLInputElement | null>(null);
const startButton = ref<HTMLButtonElement | null>(null);
const resetButton = ref<HTMLButtonElement | null>(null);

const handleStartClick = () => {
    startTest();
    textInput.value?.focus();
};

const handleEndClick = () => {
    endTest();
    textInput.value?.blur();
};

const handleResetClick = () => {
    resetTest();
    startButton.value?.focus();
};

watch(typedText, () => {
    if (testStarted.value && !testEnded.value && wordsTyped.value === wordLimit) {
        endTest();
    }
});

onMounted(() => {
    resetTest();
    startButton.value?.focus();
});
</script>

<template>
    <div class="typing-test wrapper">
        <h1>Typing Test</h1>
        <div class="count-indicator">
            <span>{{ currentWordIndex + 1 }}/{{ wordLimit }}</span>
            <span>{{ " " }}</span>
            <span class="errors-count" v-if="errorsCount > 0">Errors: {{ errorsCount }}</span>
        </div>
        <div class="wpm-indicator">
            <span>{{ wpm }} WPM</span>
        </div>
        <div class="visual-text">
            <ItemChar
                v-for="(item, index) in visibleTextData"
                :key="item.id"
                :item="item"
                :active="testStarted && index === cursorIndex"
            />
        </div>
        <div class="test-input-wrapper">
            <label for="test-input">
                <input
                    class="test-input"
                    ref="textInput"
                    id="test-input"
                    type="text"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    v-model.trim="typedText"
                />
            </label>
        </div>
        <div class="buttons">
            <button v-if="!testStarted" ref="startButton" @click="handleStartClick">Start</button>
            <button v-else-if="testStarted && !testEnded" ref="endButton" @click="handleEndClick">End</button>
            <button v-else ref="resetButton" @click="handleResetClick">Reset</button>
        </div>
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

input.test-input {
    position: absolute;
    opacity: 0;
    z-index: -1;
    width: 0;
    height: 0;
}

.errors-count {
    color: red;
}
</style>
