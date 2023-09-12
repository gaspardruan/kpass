<template>
  <n-modal
    v-model:show="showModifyPodModal"
    class="custom-card"
    preset="card"
    :mask-closable="false"
    :style="{ width: '500px', height: '400px' }"
    title="通过Dockerfile修改Pod"
    size="huge"
    :bordered="false"
    :closable="false"
  >
    <n-input v-model:value="dockerfile" rows="10" type="textarea" placeholder="Dockerfile" />
    <template #footer>
      <div class="flex w-32 mx-auto justify-between">
        <n-button @click="closeModifyPodModal">取消</n-button>
        <n-button type="primary" @click="handleModifyPod">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{ show: boolean; imageName: string }>()
const emit = defineEmits(['update:show'])

const dockerfile = ref('')

const showModifyPodModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const cleanPodModal = () => {
  showModifyPodModal.value = false
  dockerfile.value = ''
}

const handleModifyPod = () => {
  console.log(props.imageName + ':' + dockerfile.value)
  cleanPodModal()
}

const closeModifyPodModal = () => {
  cleanPodModal()
}
</script>
