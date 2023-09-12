<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :mask-closable="false"
    :style="{ width: '600px', height: '450px' }"
    title="创建镜像"
    size="huge"
    :bordered="false"
    :closable="false"
  >
    <n-tabs type="line" animated @update:value="handleTabUpdate">
      <n-tab-pane name="fromDockerfile" tab="Dockerfile">
        <n-input v-model:value="dockerfile" type="textarea" rows="9" placeholder="dockerfile" />
      </n-tab-pane>
      <n-tab-pane name="fromSource" tab="源代码压缩包">
        <n-upload
          ref="uploadFromSourceRef"
          directory-dnd
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          class="h-52"
          :default-upload="false"
        >
          <n-upload-dragger>
            <div>
              <n-icon size="48" :depth="3">
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0"> 请上传包含Dockerfile的源代码压缩包 </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-tab-pane>
      <n-tab-pane name="fromImage" tab="镜像文件">
        <n-upload
          ref="uploadFromImageRef"
          directory-dnd
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          class="h-52"
          :default-upload="false"
        >
          <n-upload-dragger>
            <div>
              <n-icon size="48" :depth="3">
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0"> 请上传镜像文件 </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-tab-pane>
      <n-tab-pane name="fromCodeHub" tab="代码仓库地址">
        <n-input-group class="py-8">
          <n-tag size="large"> 代码仓库地址 </n-tag>
          <n-input v-model:value="codeHubURL" :input-props="{ type: 'url' }" placeholder="URL" />
        </n-input-group>
      </n-tab-pane>
      <n-tab-pane name="fromPublicHub" tab="公共仓库镜像">
        <n-input-group class="py-8">
          <n-tag size="large"> 公共仓库镜像 </n-tag>
          <n-select
            filterable
            placeholder="选择镜像"
            :options="publicHubImages"
            v-model:value="publicHubImage"
          >
            <template #arrow>
              <search-icon />
            </template>
          </n-select>
        </n-input-group>
      </n-tab-pane>
    </n-tabs>
    <template #footer>
      <div class="flex w-32 mx-auto justify-between">
        <n-button @click="closeModal">取消</n-button>
        <n-button type="primary" @click="createImage">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UploadInst } from 'naive-ui'
import { Search as SearchIcon, ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const showModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})
const curTab = ref('fromdockerfile')
const dockerfile = ref('')
const codeHubURL = ref('')
const publicHubImage = ref('')
const uploadFromSourceRef = ref<UploadInst | null>(null)
const uploadFromImageRef = ref<UploadInst | null>(null)
const handleTabUpdate = (tab: string) => {
  curTab.value = tab
}

const cleanTab = () => {
  showModal.value = false
  dockerfile.value = ''
  codeHubURL.value = ''
  curTab.value = 'fromDockerfile'
  publicHubImage.value = ''

  //   emit('update:show', false)
}

const closeModal = () => {
  cleanTab()
}
const createImage = () => {
  if (curTab.value === 'fromSource') {
    uploadFromSourceRef.value?.submit()
  } else if (curTab.value === 'fromImage') {
    uploadFromImageRef.value?.submit()
  } else if (curTab.value === 'fromCodeHub') {
    console.log(codeHubURL.value)
  } else if (curTab.value === 'fromPublicHub') {
    console.log(publicHubImage.value)
  } else {
    console.log(dockerfile.value)
  }

  cleanTab()
}

const publicHubImages = [
  {
    label: 'nginx',
    value: 'nginx'
  },
  {
    label: 'wordpress',
    value: 'wordpress'
  },
  {
    label: 'redis',
    value: 'redis'
  },
  {
    label: 'mysql',
    value: 'mysql'
  }
]
</script>
