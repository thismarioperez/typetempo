<script lang="ts" setup>
import { useTypingTestStore } from "@/stores/typingTest";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const typingTestStore = useTypingTestStore();
const {
    // actions
    startTest,
    endTest,
    resetTest,
} = typingTestStore;

const {
    wordLimit,
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
    textInput.value?.focus();
    startTest();
};

const handleResetClick = () => {
    startButton.value?.focus();
    resetTest();
};

watch(typedText, () => {
    if (testStarted.value && !testEnded.value && wordsTyped.value === testText.value.split(" ").length) {
        endTest();
        resetButton.value?.focus();
    }
});
</script>

<template>
    <div class="typing-test">
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
            <!-- TODO: create more stable unique keys for each item -->
            <span
                v-for="(item, index) in visibleTextData"
                :key="index"
                :class="{
                    correct: item.status === 'correct',
                    incorrect: item.status === 'incorrect',
                    unknown: item.status === 'unknown',
                }"
            >
                {{ item.value }}
            </span>
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
            <button ref="startButton" @click="handleStartClick">Start</button>
            <button ref="resetButton" @click="handleResetClick">Reset</button>
        </div>
    </div>
</template>

<style scoped>
.correct {
    color: inherit;
    opacity: 1;
}

.incorrect {
    color: red;
}

.unknown {
    color: inherit;
    opacity: 0.5;
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
