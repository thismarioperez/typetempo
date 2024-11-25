<script setup lang="ts">
import type { Character } from "@/models";

defineProps<{
    item: Character;
}>();
</script>

<template>
    <span
        :key="$props.key"
        :class="{
            correct: $props.item.status === 'correct',
            incorrect: $props.item.status === 'incorrect',
            unknown: $props.item.status === 'unknown',
        }"
    >
        {{ $props.item.value }}
    </span>
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
