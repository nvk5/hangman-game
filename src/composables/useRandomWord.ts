import { onMounted, ref } from 'vue'
import { getRandomName } from '@/api/getRandomName.ts'

export const useRandomWord = () => {
  const word = ref<string>('')
  const error = ref<null | string>(null)
  const loading = ref<boolean>(false)

  async function getRandomWord() {
    try {
      loading.value = true
      error.value = null
      word.value = await getRandomName()
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else if (typeof err === 'string') {
        error.value = err.toLowerCase()
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(getRandomWord)

  return { word, error, loading, getRandomWord }
}
