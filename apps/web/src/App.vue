<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
    <TheHeader class="header" />
    <RouterView class="main" />
</template>

<style scoped>
.header {
    flex: 0;
}

.main {
    flex: 1;
    justify-self: stretch;
}
</style>
