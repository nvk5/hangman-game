<script setup lang="ts">
import { ref } from 'vue'
import type { Status } from '@/types/GameStatus.ts'

const gameStatus = ref<Status | null>(null)
const isVisible = ref<boolean>(false)

const open = (status: Status) => {
  isVisible.value = true
  gameStatus.value = status
}
const close = () => (isVisible.value = false)

defineProps<{
  word: string
  fetchLoading: boolean
  fetchError: string | null
}>()
defineExpose({ open, close })
const emit = defineEmits<{
  (e: 'restart'): void
}>()
</script>
<template>
  <div v-if="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
      <template v-else>
        <h2>Вы проиграли. 😕</h2>
        <h3>...имя: {{ word }}</h3>
      </template>
      <button @click="emit('restart')">
        <span v-if="fetchLoading">Loading...</span>
        <span v-else>Сыграть еще раз</span>
      </button>
      <p style="color: red">{{ fetchError }}</p>
    </div>
  </div>
</template>

<style scoped></style>
