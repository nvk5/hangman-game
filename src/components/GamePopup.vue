<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { GameStatus } from '@/types/GameStatus'
import GameSpinner from '@/components/GameSpinner.vue'

interface Props {
  word: string,
  loading: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})


const gameStatus = ref<GameStatus | null>(null)
const isVisible = ref(false)
const restartButton = ref<HTMLButtonElement | null>(null);

watch(isVisible, () => {
  nextTick(() => {
    restartButton.value?.focus()
  })
})

const open = (status: GameStatus) => {
  gameStatus.value = status
  isVisible.value = true
}
const close = () => {
  isVisible.value = false
}

defineExpose({
  open,
  close
})

const emit = defineEmits<{
  (e: 'restart'): void
}>()
</script>

<template>
  <div v-if="isVisible" class="popup-container">
    <form class="popup" @submit.prevent="emit('restart')">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
      <template v-else>
        <h2>Вы проиграли. 😕</h2>
        <h3>...имя: {{ `${word.split('')[0].toUpperCase()}${word.slice(1)}` }}</h3>
      </template>
      <button :disabled='loading' ref='restartButton'>
        <span v-if='loading'><GameSpinner/></span>
        <span v-else>Сыграть еще раз</span>
      </button>
    </form>
  </div>
</template>
