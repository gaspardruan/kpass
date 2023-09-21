<template>
  <n-modal
    v-model:show="showExposePodModal"
    class="custom-card"
    preset="card"
    :mask-closable="false"
    :style="{ width: '500px', height: '300px' }"
    title="从镜像创建Pod"
    size="huge"
    :bordered="false"
    :closable="false"
  >
    <n-form
      :rules="rules"
      :model="exposedPod"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="medium"
    >
      <n-form-item label="pod名称" path="podName">
        <n-input disabled v-model:value="exposedPod.podName" placeholder="Pod名称" />
      </n-form-item>
      <n-form-item label="端口" path="podPort">
        <n-input-number
          :show-button="false"
          min="20000"
          max="40000"
          v-model:value="exposedPod.podPort"
          placeholder="端口"
        />
      </n-form-item>
    </n-form>
    <template #footer>
      <div class="flex w-32 mx-auto justify-between">
        <n-button @click="closePodModal">取消</n-button>
        <n-button type="primary" @click="handleExposePod">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { exposePod } from '@/api/pod'
import { useMessage } from 'naive-ui'

const message = useMessage()
// const dialog = useDialog()

const props = defineProps<{ show: boolean; podName: string }>()
const emit = defineEmits(['update:show'])

const showExposePodModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const exposedPod = ref<ExposePod>({
  podName: props.podName,
  podPort: null
})

watch(
  () => props.podName,
  () => {
    exposedPod.value.podName = props.podName
  }
)

const rules = {
  podName: {
    required: true
  },
  podPort: {
    type: 'number',
    required: true
  }
}

const cleanPodModal = () => {
  showExposePodModal.value = false
  exposedPod.value.podPort = null
}

const handleExposePod = () => {
  console.log(exposedPod.value)
  if (exposedPod.value.podPort === null) exposedPod.value.podPort = 0
  exposePod(exposedPod.value.podName, exposedPod.value.podPort).then((res) => {
    if (res.status === 200) {
      message.success(
        '暴露Pod: ' + exposedPod.value.podName + '到端口: ' + exposedPod.value.podPort
      )
    } else {
      message.warning('暴露Pod失败')
    }
    cleanPodModal()
  })
}

const closePodModal = () => {
  cleanPodModal()
}
</script>
