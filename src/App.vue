<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalContent from '@/components/GlobalContent.vue'

import { onMounted } from 'vue'
import { getPublicImageList, getUserImageList } from '@/api/image'
import useUserStore from '@/stores/user'
import useImageStore from '@/stores/image'
const { setPublicImage, setPrivateImage } = useImageStore()
const userStore = useUserStore()

onMounted(() => {
  getPublicImageList().then((res) => {
    setPublicImage(res.data.infoList)
  })

  getUserImageList(userStore.userId).then((res) => {
    setPrivateImage(res.data.infoList)
  })
})
</script>

<template>
  <global-header class="z-50" />
  <n-message-provider>
    <n-dialog-provider>
      <global-content class="z-10">
        <router-view />
      </global-content>
    </n-dialog-provider>
  </n-message-provider>
</template>

<style scoped></style>
