<template>
  <div class="flex min-h-screen pt-12 bg-gray-50" ref="contentRef">
    <div class="h-full mx-auto z-20">
      <!-- <div class="h-12"></div> -->
      <slot></slot>
      <n-button
        class="fixed right-3 bottom-3 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
        type="primary"
        size="medium"
        secondary
        circle
        @click="scrollToTop"
      >
        <n-icon size="20"><back-top-icon /></n-icon>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronUp as BackTopIcon } from '@vicons/ionicons5'
import { NButton } from 'naive-ui'

// scroll to top
const contentRef = ref<null | HTMLDivElement>(null)
const scrollToTop = () => {
  if (contentRef.value) {
    contentRef.value.scrollIntoView({
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped></style>
