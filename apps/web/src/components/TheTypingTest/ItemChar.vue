<script setup lang="ts">
import type { Character } from "@/models";

defineProps<{
    item: Character;
    active?: boolean;
}>();
</script>

<template>
    <span
        :key="$props.key"
        :class="{
            character: true,
            correct: $props.item.status === 'correct',
            incorrect: $props.item.status === 'incorrect',
            unknown: $props.item.status === 'unknown',
            active: $props.active,
        }"
    >
        <span
            :class="{
                space: $props.item.type === 'space',
            }"
        >
            {{ $props.item.value }}
        </span>
    </span>
</template>

<style scoped>
.character {
    position: relative;
    display: inline;
}

@keyframes blink {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.character::after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: transparent;
    animation: blink 0.5s infinite;
}

.character.active::after {
    background-color: currentColor;
}

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

.space {
    display: inline-block;
    width: 0.5em;
}
</style>
