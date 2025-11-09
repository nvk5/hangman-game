import { ref } from 'vue'
import GamePopup from '@/components/GamePopup.vue'

export const usePopup = () => {
  const popup = ref<InstanceType<typeof GamePopup> | null>(null)

  return { popup }
}
