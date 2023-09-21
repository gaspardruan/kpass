import { computed, ref } from 'vue'
import type { SelectGroupOption } from 'naive-ui'
import { defineStore } from 'pinia'

const useImageStore = defineStore('image', () => {
  const publicImage = ref<Image[]>([])
  const privateImage = ref<Image[]>([])

  const imageNameList = computed(() => {
    const options = ref<Array<SelectGroupOption>>([])
    const list1 = ref<{ label: string; value: string }[]>([])
    const list2 = ref<{ label: string; value: string }[]>([])
    publicImage.value.forEach((image) => {
      list1.value.push({ label: image.imageName, value: image.imageName })
    })
    privateImage.value.forEach((image) => {
      list2.value.push({ label: image.imageName, value: image.imageName })
    })

    options.value.push(
      {
        type: 'group',
        label: '公有镜像',
        children: list1.value
      },
      {
        type: 'group',
        label: '私有镜像',
        children: list2.value
      }
    )
    return options.value
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

    imageNameList,
    setPublicImage,
    setPrivateImage
  }
})

export default useImageStore
