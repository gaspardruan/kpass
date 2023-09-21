<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :mask-closable="false"
    :style="{ width: '500px', height: '520px' }"
    title="创建 Image"
    size="huge"
    :bordered="false"
    :closable="false"
  >
    <n-form
      :rules="rules"
      :model="createImageModel"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="medium"
      class="max-w-md mx-auto pt-4"
    >
      <n-form-item label="Image名称" path="imageName">
        <n-input v-model:value="createImageModel.imageName" placeholder="Image名称" />
      </n-form-item>

      <n-form-item label="用户ID" path="userId">
        <n-input v-model:value="createImageModel.userId" placeholder="用户ID" />
      </n-form-item>

      <n-form-item label="标签" path="labels">
        <n-input v-model:value="createImageModel.labels" placeholder="标签" />
      </n-form-item>

      <n-form-item label="Dockerfile" path="dockerfile">
        <n-upload :file-list="fileList" :default-upload="false" @change="handleFileChange" :max="1">
          <n-button>选择Dockerfile</n-button>
        </n-upload>
      </n-form-item>
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
import { useMessage } from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'
import { createImage } from '@/api/image'

const fileList = ref<UploadFileInfo[]>([])
const file = computed(() => {
  return fileList.value.length === 0 ? null : fileList.value[0].file
})
function handleFileChange(data: { fileList: UploadFileInfo[] }) {
  fileList.value = data.fileList
}

const message = useMessage()

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits(['update:show', 'imageCreated'])

const createImageModel = ref<CreateImageForm>({
  imageName: '',
  userId: '',
  labels: '',
  dockerfile: null
})

const rules = {
  imageName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入image名称'
  },
  image: {
    required: true
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
  createImageModel.value.imageName = ''
  createImageModel.value.userId = ''
  createImageModel.value.labels = ''
  createImageModel.value.dockerfile = null
  fileList.value = []
  showModal.value = false
}

const closeModal = () => {
  cleanModal()
}

const handleCreateDeploy = () => {
  if (file.value) {
    createImageModel.value.dockerfile = file.value

    createImage(createImageModel.value).then((res) => {
      if (res.status == 200) {
        message.success('创建Image成功')
        emit('imageCreated')
      } else {
        message.warning('创建Image失败')
      }
    })
    cleanModal()
  } else {
    message.warning('Dockfile不能为空')
  }
}
</script>
