<template>
  <n-modal
    v-model:show="showExposePodModal"
    class="custom-card"
    preset="card"
    :mask-closable="false"
    :style="{ width: '500px', height: '300px' }"
    title="更新 Deployment 镜像"
    size="huge"
    :bordered="false"
    :closable="false"
  >
    <n-form
      :rules="rules"
      :model="updateDeployModel"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="medium"
    >
      <n-form-item label="Deployment名称" path="deploymentName">
        <n-input
          disabled
          v-model:value="updateDeployModel.deploymentName"
          placeholder="Deployment名称"
        />
      </n-form-item>
      <n-form-item label="镜像名称" path="imageName">
        <n-select
          filterable
          placeholder="选择镜像"
          :options="imageStore.imageNameList"
          v-model:value="updateDeployModel.imageName"
        >
          <template #arrow>
            <search-icon />
          </template>
        </n-select>
      </n-form-item>
    </n-form>
    <template #footer>
      <div class="flex w-32 mx-auto justify-between">
        <n-button @click="closePodModal">取消</n-button>
        <n-button type="primary" @click="handleUpdateDeploy">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { updateDeploy } from '@/api/pod'
import { useMessage } from 'naive-ui'
import { Search as SearchIcon } from '@vicons/ionicons5'

import useImageStore from '@/stores/image'
const imageStore = useImageStore()

const message = useMessage()
// const dialog = useDialog()

const props = defineProps<{ show: boolean; deploymentName: string }>()
const emit = defineEmits(['update:show', 'deployUpdated'])

const showExposePodModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const updateDeployModel = ref<UpdateDeployForm>({
  deploymentName: props.deploymentName,
  imageName: ''
})

watch(
  () => props.deploymentName,
  () => {
    updateDeployModel.value.deploymentName = props.deploymentName
  }
)

const rules = {
  deploymentName: {
    required: true
  },
  imageName: {
    required: true
  }
}

const cleanPodModal = () => {
  showExposePodModal.value = false
  updateDeployModel.value.imageName = ''
}

const handleUpdateDeploy = () => {
  console.log(updateDeployModel.value)
  if (updateDeployModel.value.imageName === '') return
  updateDeploy(updateDeployModel.value).then((res) => {
    if (res.data === true) {
      message.success(
        '更新Deployment: ' +
          updateDeployModel.value.deploymentName +
          '为镜像: ' +
          updateDeployModel.value.imageName
      )
    } else {
      message.warning('更新Deployment镜像失败')
    }
    cleanPodModal()
  })
}

const closePodModal = () => {
  cleanPodModal()
}
</script>
