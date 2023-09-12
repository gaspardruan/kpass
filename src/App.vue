<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalContent from '@/components/GlobalContent.vue'
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
