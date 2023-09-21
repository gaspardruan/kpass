import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const useImageStore = defineStore('image', () => {
  const publicImage = ref<Image[]>([])
  const privateImage = ref<Image[]>([])

  const publicImageNames = computed(() => {
    const list = ref<{ label: string; value: string }[]>([])
    publicImage.value.forEach((image) => {
      list.value.push({ label: image.imageName, value: image.imageName })
    })
    return list.value
  })

  const privateImageNames = computed(() => {
    const list = ref<{ label: string; value: string }[]>([])
    privateImage.value.forEach((image) => {
      list.value.push({ label: image.imageName, value: image.imageName })
    })
    return list
  })

  function setPublicImage(images: Image[]) {
    publicImage.value = images
  }

  function setPrivateImage(images: Image[]) {
    privateImage.value = images
  }

  return {
    publicImage,
    privateImage,
    publicImageNames,
    privateImageNames,
    setPublicImage,
    setPrivateImage
  }
})

export default useImageStore
