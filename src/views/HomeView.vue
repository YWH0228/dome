<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
const name = ref('徐良')
</script>

<template>
  <main>
    <TheWelcome />
    <h1>{{ name }}</h1>
  </main>
</template>
