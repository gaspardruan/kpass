<template>
  <div class="flex justify-between">
    <div class="flex py-2" :style="{ fontFamily: 'en-title' }">
      <n-gradient-text :size="32" type="success" class="font-bold leading-relaxed tracking-wide">
        {{ title }}
      </n-gradient-text>
      <div class="text-gray-400 self-center ml-3">{{ title }} 管理界面</div>
    </div>
    <n-button circle type="primary" class="py-2 self-center" @click="$emit('click')">
      <template #icon>
        <n-icon size="24"><create-icon /></n-icon>
      </template>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { AddSharp as CreateIcon } from '@vicons/ionicons5'

defineProps<{ title: string }>()
defineEmits(['click'])
</script>
