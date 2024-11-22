<script lang="ts" setup>
import { useTypingTestStore } from "@/stores/typingTest";
import { storeToRefs } from "pinia";

const typingTestStore = useTypingTestStore();
const {
    // actions
    startTest,
    endTest,
} = typingTestStore;

const { visibleTextData, typedText } = storeToRefs(typingTestStore);
</script>

<template>
    <div id="typing-test">
        <div id="visual-text">
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
        <div id="test-input-wrapper">
            <label for="test-input">
                <input
                    id="test-input"
                    type="text"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    v-model.trim="typedText"
                    @focus="startTest"
                    @blur="endTest"
                />
            </label>
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
</style>
