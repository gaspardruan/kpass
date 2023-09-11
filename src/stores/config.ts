import { ref } from 'vue'
import { defineStore } from 'pinia'

const useConfigStore = defineStore('config', () => {
  const isThemeDark = ref(false)
  const isChinese = ref(true)

  function toggleTheme() {
    isThemeDark.value = !isThemeDark.value
  }

  function toggleLanguage() {
    isChinese.value = !isChinese.value
  }

  return { isThemeDark, toggleTheme, isChinese, toggleLanguage }
})

export default useConfigStore
