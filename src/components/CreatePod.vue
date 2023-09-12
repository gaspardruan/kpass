<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :mask-closable="false"
    :style="{ width: '600px', height: '450px' }"
    title="创建Pod"
    size="huge"
    :bordered="false"
    :closable="false"
  >
    <n-tabs type="line" animated @update:value="handleTabUpdate">
      <n-tab-pane name="fromImage" tab="选择镜像创建">
        <n-input-group class="py-8">
          <n-tag size="large"> 选择镜像 </n-tag>
          <n-select
            filterable
            placeholder="选择镜像"
            :options="imageNameList"
            v-model:value="selectedImageName"
          >
            <template #arrow>
              <search-icon />
            </template>
          </n-select>
        </n-input-group>
      </n-tab-pane>
      <n-tab-pane name="fromYAML" tab="从YAML文件创建">
        <n-input v-model:value="yaml" type="textarea" rows="9" placeholder="YAML" />
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
import { computed, ref } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const showModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const curTab = ref('fromImage')
const handleTabUpdate = (tab: string) => {
  curTab.value = tab
}

const yaml = ref('')

const selectedImageName = ref('')
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
  showModal.value = false
  selectedImageName.value = ''
  yaml.value = ''
  curTab.value = 'fromImage'
}

const closeModal = () => {
  cleanTab()
}

const createPod = () => {
  if (curTab.value === 'fromImage') {
    console.log(selectedImageName.value)
  } else {
    console.log(yaml.value)
  }

  cleanTab()
}
</script>
