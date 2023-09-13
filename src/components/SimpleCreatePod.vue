<template>
  <n-modal
    v-model:show="showCreatePodModal"
    class="custom-card"
    preset="card"
    :mask-closable="false"
    :style="{ width: '500px', height: '400px' }"
    title="从镜像创建Pod"
    size="huge"
    :bordered="false"
    :closable="false"
  >
    <n-form
      :rules="rules"
      :model="createPod"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="medium"
    >
      <n-form-item label="镜像ID" path="imageID">
        <n-input disabled v-model:value="createPod.imageID" />
      </n-form-item>
      <n-form-item label="镜像名称" path="imageName">
        <n-input disabled v-model:value="createPod.imageName" />
      </n-form-item>
      <n-form-item label="pod名称" path="podName">
        <n-input v-model:value="createPod.podName" placeholder="Pod名称" />
      </n-form-item>
      <n-form-item label="端口" path="podPort">
        <n-input-number
          :show-button="false"
          min="0"
          max="65535"
          v-model:value="createPod.podPort"
          placeholder="端口"
        />
      </n-form-item>
    </n-form>
    <template #footer>
      <div class="flex w-32 mx-auto justify-between">
        <n-button @click="closePodModal">取消</n-button>
        <n-button type="primary" @click="handleCreatePod">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{ show: boolean; imageID: string; imageName: string }>()
const emit = defineEmits(['update:show'])

const showCreatePodModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const createPod = ref<CreatePod>({
  imageID: props.imageID,
  imageName: props.imageName,
  podName: '',
  podPort: null
})

watch([() => props.imageID, () => props.imageName], () => {
  createPod.value.imageID = props.imageID
  createPod.value.imageName = props.imageName
})

const rules = {
  imageID: {
    required: true
  },
  imageName: {
    required: true
  },
  podName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入Pod名'
  },
  podPort: {
    type: 'number'
  }
}

const cleanPodModal = () => {
  showCreatePodModal.value = false
  createPod.value.podName = ''
  createPod.value.podPort = null
}

const handleCreatePod = () => {
  console.log(createPod.value)
  cleanPodModal()
}

const closePodModal = () => {
  cleanPodModal()
}
</script>
