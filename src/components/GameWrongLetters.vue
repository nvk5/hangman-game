<script setup lang="ts">
defineProps<{
  wrongLetters: string[]
}>()
</script>
<template>
  <div v-if="wrongLetters.length" class="wrong-letters-container">
    <div class="wrong-letters">
      <p>Ошибки</p>
      <span v-for="(letter, index) in wrongLetters" :key="index">
        {{ wrongLetters.length - 1 === index ? letter : `${letter}, ` }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
