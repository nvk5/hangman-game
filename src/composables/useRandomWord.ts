import { getRandomName } from "@/api/getRandomName"
import { onMounted, ref } from "vue"
import type { AxiosError } from 'axios'
import axios from 'axios'

export const useRandomWord = () => {
  const word = ref('')
  const loading = ref(false);
  const getRandomWord = async () => {
    try {
      loading.value = true;
      const firstName = await getRandomName()
      word.value = firstName.toLowerCase()
    } catch (err: unknown) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
          console.log('some error: ', err);
          alert(`${errors.name}: ${errors.message}`)
        } else {
          console.log('axios error: ', err);
          alert(`${errors.name}: ${errors.message}`)
        }

        word.value = ''
    } finally {
      loading.value = false;
    }
  }

  onMounted(async () => {
    await getRandomWord()
  })

  return {
    word,
    getRandomWord,
    loading
  }
}