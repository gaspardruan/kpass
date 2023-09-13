<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :mask-closable="false"
    :style="{ width: '600px', height: '500px' }"
    :title="action + 'Service'"
    size="huge"
    :bordered="false"
    :closable="false"
    display-directive="show"
  >
    <n-tabs type="line" animated @update:value="handleTabUpdate" v-model:value="curTab">
      <n-tab-pane name="fromForm" :tab="`选择镜像` + action">
        <n-form
          :rules="rules"
          :model="serviceModel"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="small"
          class="max-w-md mx-auto"
        >
          <n-form-item label="Service名称" path="name">
            <n-input
              :disabled="type === `update`"
              v-model:value="serviceModel.name"
              placeholder="Service名称"
            />
          </n-form-item>
          <n-form-item label="类型" path="type">
            <n-select
              filterable
              placeholder="选择镜像"
              :options="serviceTypeList"
              v-model:value="serviceModel.type"
            >
            </n-select>
          </n-form-item>

          <n-form-item label="端口" path="port">
            <n-input-number
              :show-button="false"
              min="0"
              max="65535"
              v-model:value="serviceModel.port"
              placeholder="端口"
            />
          </n-form-item>
          <n-form-item label="目标端口" path="targetPort">
            <n-input-number
              :show-button="false"
              min="0"
              max="65535"
              v-model:value="serviceModel.targetPort"
              placeholder="目标端口"
            />
          </n-form-item>
          <n-form-item label="Pod选择器" path="selector">
            <n-dynamic-tags v-model:value="serviceModel.selector" />
          </n-form-item>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="fromYAML" :tab="`从 YAML 文件` + action" display-directive="show">
        <div ref="editorRef" class="h-64"></div>
      </n-tab-pane>
    </n-tabs>
    <template #footer>
      <div class="flex w-32 mx-auto justify-between">
        <n-button @click="closeModal">取消</n-button>
        <n-button type="primary" @click="createService">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRaw } from 'vue'
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution'

const props = defineProps<{
  show: boolean
  type: 'create' | 'update'
  name?: string
}>()
const emit = defineEmits(['update:show'])

const action = computed(() => {
  if (props.type === 'create') {
    return '创建'
  } else {
    return '修改'
  }
})

watch(
  () => props.name,
  (val) => {
    if (val) serviceModel.value.name = val
  }
)

const showModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const curTab = ref('fromForm')
const handleTabUpdate = (tab: string) => {
  curTab.value = tab
}

const serviceModel = ref<CreateService>({
  name: '',
  type: '',
  port: 0,
  targetPort: 0,
  selector: ['kkk:hahaha']
})

const serviceTypeList = [
  {
    label: 'ClusterIP',
    value: 'ClusterIP'
  },
  {
    label: 'NodePort',
    value: 'NodePort'
  }
]

const rules = {
  name: {
    required: true,
    message: '请填写Service名称'
  },
  type: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择一种类型'
  },
  port: {
    required: true,
    type: 'number',
    message: '请输入端口号'
  },
  targetPort: {
    required: true,
    type: 'number',
    message: '请输入目标端口号'
  },
  selector: {
    required: true,
    message: '请添加Pod标签',
    validator(rule: unknown, value: string[]) {
      if (value.length < 1) return new Error('至少要有1个标签')
      return true
    }
  }
}

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
watch(
  () => curTab.value,
  (val) => {
    if (val === 'fromYAML') {
      initEditor()
    }
  }
)
const getContent = () => {
  if (!yamlEditor.value) return
  return toRaw(yamlEditor.value).getValue()
}

const setContent = (content: string) => {
  if (!yamlEditor.value) return
  toRaw(yamlEditor.value).setValue(content)
}

const cleanTab = () => {
  if (props.type === 'create') serviceModel.value.name = ''
  serviceModel.value.type = 'ClusterIP'
  serviceModel.value.port = 0
  serviceModel.value.targetPort = 0
  serviceModel.value.selector = []
  setContent('')
  curTab.value = 'fromForm'
  showModal.value = false
}

const closeModal = () => {
  cleanTab()
}

const createService = () => {
  if (curTab.value === 'fromForm') {
    console.log(serviceModel.value)
  } else {
    if (yamlEditor.value) {
      console.log(getContent())
    }
  }

  cleanTab()
}
</script>
