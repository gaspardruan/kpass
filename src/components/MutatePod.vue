<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :mask-closable="false"
    :style="{ width: '600px', height: '500px' }"
    :title="title + ` Pod`"
    size="huge"
    :bordered="false"
    :closable="false"
    display-directive="show"
  >
    <n-tabs type="line" animated @update:value="handleTabUpdate" v-model:value="curTab">
      <n-tab-pane name="fromImage" :tab="`选择镜像` + title">
        <n-form
          :rules="rules"
          :model="podModel"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="medium"
          class="max-w-md mx-auto pt-4"
        >
          <n-form-item label="镜像名称" path="imageName">
            <n-select
              filterable
              placeholder="选择镜像"
              :options="imageNameList"
              v-model:value="podModel.imageName"
            >
              <template #arrow>
                <search-icon />
              </template>
            </n-select>
          </n-form-item>
          <n-form-item label="pod名称" path="podName">
            <n-input
              :disabled="type === `update`"
              v-model:value="podModel.podName"
              placeholder="Pod名称"
            />
          </n-form-item>
          <n-form-item label="端口" path="podPort">
            <n-input-number
              :show-button="false"
              min="0"
              max="65535"
              v-model:value="podModel.podPort"
              placeholder="端口"
            />
          </n-form-item>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="fromYAML" :tab="`从YAML文件` + title" display-directive="show">
        <div ref="editorRef" class="h-64"></div>
      </n-tab-pane>
    </n-tabs>
    <template #footer>
      <div class="flex w-32 mx-auto justify-between">
        <n-button @click="closeModal">取消</n-button>
        <n-button type="primary" @click="createPod">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch, toRaw } from 'vue'
import { Search as SearchIcon } from '@vicons/ionicons5'
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution'

const props = defineProps<{ show: boolean; type: 'create' | 'update'; podName?: string }>()
const emit = defineEmits(['update:show'])

const podModel = ref<CreatePodV2>({
  imageName: '',
  podName: props.type === 'update' && props.podName ? props.podName : '',
  podPort: null
})

watch(
  () => props.podName,
  (val) => {
    if (val) podModel.value.podName = val
  }
)

const rules = {
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

const title = computed(() => {
  if (props.type === 'create') {
    return '创建'
  } else {
    return '修改'
  }
})

const showModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const curTab = ref('fromImage')
const handleTabUpdate = (tab: string) => {
  curTab.value = tab
}

watch(
  () => curTab.value,
  (val) => {
    if (val === 'fromYAML') {
      initEditor()
    }
  }
)

const editorRef = ref<HTMLElement | null>(null)
const yamlEditor = ref<monaco.editor.IStandaloneCodeEditor | null>(null)

const initEditor = () => {
  if (yamlEditor.value) return
  yamlEditor.value = monaco.editor.create(editorRef.value as HTMLElement, {
    value: '',
    language: 'yaml',
    automaticLayout: true
  })
}

const imageNameList = [
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

const cleanTab = () => {
  podModel.value.imageName = ''
  if (props.type === 'create') podModel.value.podName = ''
  podModel.value.podPort = null
  setContent('')
  curTab.value = 'fromImage'
  showModal.value = false
}

const closeModal = () => {
  cleanTab()
}

const getContent = () => {
  if (!yamlEditor.value) return
  return toRaw(yamlEditor.value).getValue()
}

const setContent = (content: string) => {
  if (!yamlEditor.value) return
  toRaw(yamlEditor.value).setValue(content)
}

const createPod = () => {
  if (curTab.value === 'fromImage') {
    console.log(podModel.value)
  } else {
    if (yamlEditor.value) {
      console.log(getContent())
    }
  }

  cleanTab()
}
</script>
