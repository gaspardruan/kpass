<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :mask-closable="false"
    :style="{ width: '500px', height: '520px' }"
    title="创建 Deployment"
    size="huge"
    :bordered="false"
    :closable="false"
    display-directive="show"
  >
    <n-form
      :rules="rules"
      :model="createDeployModel"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="medium"
      class="max-w-md mx-auto pt-4"
    >
      <n-form-item label="Deployment名称" path="name">
        <n-input v-model:value="createDeployModel.name" placeholder="Deployment名称" />
      </n-form-item>

      <n-form-item label="镜像名称" path="image">
        <n-select
          filterable
          placeholder="选择镜像"
          :options="imageStore.imageNameList"
          v-model:value="createDeployModel.image"
        >
          <template #arrow>
            <search-icon />
          </template>
        </n-select>
      </n-form-item>

      <n-form-item label="端口" path="port">
        <n-input-number
          :show-button="false"
          min="0"
          max="65535"
          v-model:value="createDeployModel.port"
          placeholder="端口"
        />
      </n-form-item>

      <n-form-item label="用户ID" path="userId">
        <n-input v-model:value="createDeployModel.userId" placeholder="用户ID" />
      </n-form-item>

      <n-form-item label="标签" path="labels">
        <n-input v-model:value="createDeployModel.labels" placeholder="标签" />
      </n-form-item>

      <n-form-item label="环境变量" path="envVars">
        <n-input v-model:value="createDeployModel.envVars" placeholder="环境变量" />
      </n-form-item>

      <!-- <n-form-item label="标签" path="labels">
        <n-dynamic-tags v-model:value="createDeployModel.labels" />
      </n-form-item> -->
    </n-form>

    <template #footer>
      <div class="flex w-32 mx-auto justify-between">
        <n-button @click="closeModal">取消</n-button>
        <n-button type="primary" @click="handleCreateDeploy">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search as SearchIcon } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { createDeploy } from '@/api/pod'

import useImageStore from '@/stores/image'
const imageStore = useImageStore()

const message = useMessage()

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits(['update:show', 'deployCreated'])

const createDeployModel = ref<CreateDeployForm>({
  name: '',
  image: '',
  port: null,
  envVars: '',
  labels: '',
  userId: ''
})

const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入Deployment名称'
  },
  image: {
    required: true
  },
  port: {
    type: 'number'
  },
  userId: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入用户ID'
  }
}

const showModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const cleanModal = () => {
  createDeployModel.value.image = ''
  createDeployModel.value.name = ''
  createDeployModel.value.port = null
  createDeployModel.value.labels = ''
  createDeployModel.value.envVars = ''
  createDeployModel.value.userId = ''
  showModal.value = false
}

const closeModal = () => {
  cleanModal()
}

const handleCreateDeploy = () => {
  createDeploy(createDeployModel.value).then((res) => {
    if (res.status === 200) {
      message.success('创建Deployment成功')
      emit('deployCreated')
    } else {
      message.warning('创建Deployment失败')
    }
    cleanModal()
  })
}
</script>
