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
      :model="exposedDeploy"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="medium"
    >
      <n-form-item label="pod名称" path="deployName">
        <n-input disabled v-model:value="exposedDeploy.deployName" placeholder="Pod名称" />
      </n-form-item>
      <n-form-item label="端口" path="deployPort">
        <n-input-number
          :show-button="false"
          min="20000"
          max="40000"
          v-model:value="exposedDeploy.deployPort"
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
import { exposeDeploy } from '@/api/pod'
import { useMessage } from 'naive-ui'

const message = useMessage()
// const dialog = useDialog()

const props = defineProps<{ show: boolean; deployName: string }>()
const emit = defineEmits(['update:show'])

const showExposePodModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const exposedDeploy = ref<ExposeDeploy>({
  deployName: props.deployName,
  deployPort: null
})

watch(
  () => props.deployName,
  () => {
    exposedDeploy.value.deployName = props.deployName
  }
)

const rules = {
  deployName: {
    required: true
  },
  deployPort: {
    type: 'number',
    required: true
  }
}

const cleanPodModal = () => {
  showExposePodModal.value = false
  exposedDeploy.value.deployPort = null
}

const handleExposePod = () => {
  console.log(exposedDeploy.value)
  if (exposedDeploy.value.deployPort === null) exposedDeploy.value.deployPort = 0
  exposeDeploy(exposedDeploy.value.deployName, exposedDeploy.value.deployPort).then((res) => {
    if (res.status === 200) {
      message.success(
        '暴露Pod: ' + exposedDeploy.value.deployName + '到端口: ' + exposedDeploy.value.deployPort
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
