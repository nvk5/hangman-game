<script setup lang="ts">
defineProps<{
  word: string
  correctLetters: string[]
}>()
</script>

<template>
  <div class="word">
    <span class="letter" v-for="(letter, index) in word" :key="index">
      {{ correctLetters.includes(letter) ? letter : '' }}
    </span>
  </div>
</template>

<style scoped></style>
