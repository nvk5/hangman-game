<script setup lang="ts">
import GameHeader from '@/components/GameHeader.vue'
import GameFigure from '@/components/GameFigure.vue'
import GameWrongLetters from '@/components/GameWrongLetters.vue'
import GameWord from '@/components/GameWord.vue'
import GamePopup from '@/components/GamePopup.vue'
import GameNotification from '@/components/GameNotification.vue'
import { watch } from 'vue'
import { useRandomWord } from '@/composables/useRandomWord.ts'
import { useLetters } from '@/composables/useLetters.ts'
import { useNotification } from '@/composables/useNotification.ts'
import { usePopup } from '@/composables/usePopup.ts'

const { showNotification, notification } = useNotification()
const { popup } = usePopup()
const { word, fetchLoading, fetchError, getRandomWord } = useRandomWord()
const {
  correctLetters,
  wrongLetters,
  letters,
  isLose,
  isWin,
  addCyrillicLetterToLetters,
  resetLetters,
} = useLetters(word)

window.addEventListener('keydown', ({ key }: KeyboardEvent) => {
  if (isLose.value || isWin.value) {
    return
  }
  if (letters.value.includes(key)) {
    showNotification()
    return
  }

  addCyrillicLetterToLetters(key)
})
watch(wrongLetters, () => {
  if (isLose.value) {
    popup.value?.open('lose')
  }
})
watch(correctLetters, () => {
  if (isWin.value) {
    popup.value?.open('win')
  }
})

const restart = async () => {
  await getRandomWord()
  resetLetters()
  popup.value?.close()
}
</script>
<template>
  <p v-if="fetchError">{{ fetchError }}</p>
  <GameHeader />
  <main>
    <div class="game-container">
      <GameFigure :wrong-letters-count="wrongLetters.length" />
      <GameWrongLetters :wrong-letters="wrongLetters" />
      <GameWord :word="word" :correct-letters="correctLetters" />
      <GamePopup
        ref="popup"
        :word="word"
        @restart="restart"
        :fetchLoading="fetchLoading"
        :fetchError="fetchError"
      />
      <GameNotification ref="notification" />
    </div>
  </main>
</template>

<style scoped></style>
