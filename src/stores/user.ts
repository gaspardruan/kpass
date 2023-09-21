import { ref } from 'vue'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', () => {
  const userId = ref(123)

  return { userId }
})

export default useUserStore
