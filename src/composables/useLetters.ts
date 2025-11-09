import { computed, type Ref, ref } from 'vue'

export const useLetters = (word: Ref<string>) => {
  const letters = ref<string[]>([])
  const correctLetters = computed<string[]>(() => {
    return letters.value.filter((letter) => word.value.includes(letter))
  })
  const wrongLetters = computed<string[]>(() => {
    return letters.value.filter((letter) => !word.value.includes(letter))
  })
  const isWin = computed<boolean>(() => {
    return [...word.value].every((w) => correctLetters.value.includes(w))
  })
  const isLose = computed<boolean>(() => {
    return wrongLetters.value.length === 6
  })

  function addCyrillicLetterToLetters(key: string) {
    if (/[а-яА-ЯёЁ]/.test(key)) {
      letters.value.push(key.toLowerCase())
    }
  }

  function resetLetters() {
    letters.value = []
  }

  return {
    correctLetters,
    wrongLetters,
    letters,
    isLose,
    isWin,
    addCyrillicLetterToLetters,
    resetLetters,
  }
}
