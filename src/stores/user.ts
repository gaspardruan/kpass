import { ref } from 'vue'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', () => {
  const userId = ref(localStorage.getItem('userId') || '123')

  function setUserId(id: string) {
    userId.value = id
    localStorage.setItem('userId', id)
  }

  return { userId, setUserId }
})

export default useUserStore
