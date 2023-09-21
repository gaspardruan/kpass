<template>
  <div class="py-3 w-4/5 mx-auto">
    <table-header title="Pod" @click="showCreatePodModal = true" />

    <div :style="{ fontFamily: 'en-content' }">
      <n-tabs type="line" animated>
        <n-tab-pane name="pod" tab="Pod">
          <n-data-table
            :single-line="false"
            :columns="columns"
            :data="data"
            :pagination="pagination"
          />
        </n-tab-pane>
        <n-tab-pane name="deployment" tab="Deployment">
          <n-data-table
            :single-line="false"
            :columns="deployColumns"
            :data="deployData"
            :pagination="pagination"
          />
        </n-tab-pane>
      </n-tabs>
    </div>

    <mutate-pod v-model:show="showCreatePodModal" type="create" target="both" />
    <mutate-pod
      v-model:show="showUpdatePodModal"
      type="update"
      :podName="toUpdatePodName"
      target="pod"
    />
    <mutate-pod
      v-model:show="showUpdateDeployModal"
      type="update"
      :deployName="toUpdateDeployName"
      target="deploy"
    />
    <expose-pod-modal v-model:show="showExposePodModal" :podName="exposePodName" />
  </div>
</template>

<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import { NTag, NButton, NIcon, useMessage, NTooltip, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import {
  SettingsSharp as EditIcon,
  TrashBinSharp as DeleteIcon,
  OpenSharp as PortIcon,
  CheckmarkSharp as ReadyIcon,
  CloseSharp as UnreadyIcon
} from '@vicons/ionicons5'

import { getDeployList, getPodList } from '@/api/pod'

const message = useMessage()
const dialog = useDialog()

const showCreatePodModal = ref(false)
const showUpdatePodModal = ref(false)
const showUpdateDeployModal = ref(false)
const showExposePodModal = ref(false)

const toUpdatePodName = ref('')
const handleUpdatePod = (podName: string) => {
  showUpdatePodModal.value = true
  toUpdatePodName.value = podName
}

const exposePodName = ref('')
const handleExposePod = (podName: string) => {
  showExposePodModal.value = true
  exposePodName.value = podName
}

const toUpdateDeployName = ref('')
const handleUpdateDeploy = (deployName: string) => {
  showUpdateDeployModal.value = true
  toUpdateDeployName.value = deployName
}

const handleDeletePod = (podName: string) => {
  dialog.warning({
    title: '删除 Pod',
    content: '确定删除Pod ' + podName + ' 吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('删除Pod: ' + podName + '成功')
    }
  })
}

const handleDeleteDeploy = (podName: string) => {
  dialog.warning({
    title: '删除 Deployment',
    content: '确定删除Deployment: ' + podName + ' 吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('删除Deployment: ' + podName + '成功')
    }
  })
}

const data = ref<Pod2[]>([
  {
    name: 'John Brown',
    ready: false,
    ip: '',
    labels: {}
  }
])

const deployData = ref<Deployment[]>([
  {
    name: '',
    availableReplicas: 0,
    unavailableReplicas: 0,
    creationTime: '',
    labels: {}
  }
])

onMounted(() => {
  getPodList().then((res) => {
    data.value = res.data.podInfoList
  })
  getDeployList().then((res) => {
    deployData.value = res.data.deploymentListInfoList
  })
})

const pagination = {
  pageSize: 5
}

const deployColumns: DataTableColumns<Deployment> = [
  {
    title: 'Deployment名称',
    key: 'name',
    width: 150,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '可用',
    key: 'availableReplicas',
    width: 50
  },
  {
    title: '不可用',
    key: 'unavailableReplicas',
    width: 50
  },
  {
    title: '创建时间',
    key: 'creationTime',
    width: 120,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '标签',
    key: 'labels',
    width: 200,
    ellipsis: {
      tooltip: true
    },
    render(row) {
      if (row.labels === null) return null
      let tags = []
      for (let item of Object.entries(row.labels)) {
        tags.push(
          h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info',
              bordered: false
            },
            {
              default: () => item[0] + ':' + item[1]
            }
          )
        )
      }
      return tags
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    render(row) {
      return h(
        'div',
        {
          class: 'flex justify-around w-24'
        },
        [
          h(
            NTooltip,
            {
              trigger: 'hover'
            },
            {
              default: () => '修改Deployment',
              trigger: () =>
                h(
                  NButton,
                  {
                    size: 'large',
                    type: 'primary',
                    text: true,
                    onClick: () => handleUpdateDeploy(row.name)
                  },
                  {
                    default: () => h(NIcon, { size: 18 }, { default: () => h(EditIcon) })
                  }
                )
            }
          ),
          h(
            NTooltip,
            {
              trigger: 'hover'
            },
            {
              default: () => '删除Deployment',
              trigger: () =>
                h(
                  NButton,
                  {
                    size: 'large',
                    type: 'warning',
                    text: true,
                    onClick: () => handleDeleteDeploy(row.name)
                  },
                  {
                    default: () => h(NIcon, { size: 18 }, { default: () => h(DeleteIcon) })
                  }
                )
            }
          )
        ]
      )
    }
  }
]

const columns: DataTableColumns<Pod2> = [
  {
    title: 'Pod名称',
    key: 'name',
    width: 150,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '就绪',
    key: 'ready',
    width: 60,
    render(row) {
      if (row.ready) return h(NIcon, { size: 18, color: 'green' }, { default: () => h(ReadyIcon) })
      return h(NIcon, { size: 18, color: 'red' }, { default: () => h(UnreadyIcon) })
    }
  },
  {
    title: 'IP',
    key: 'ip',
    width: 130,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '标签',
    key: 'tags',
    render(row) {
      if (row.labels === null) return null
      let tags = []
      for (let item of Object.entries(row.labels)) {
        tags.push(
          h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info',
              bordered: false
            },
            {
              default: () => item[0] + ':' + item[1]
            }
          )
        )
      }
      return tags
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    render(row) {
      return h(
        'div',
        {
          class: 'flex justify-around w-24'
        },
        [
          h(
            NTooltip,
            {
              trigger: 'hover'
            },
            {
              default: () => '修改Pod',
              trigger: () =>
                h(
                  NButton,
                  {
                    size: 'large',
                    type: 'primary',
                    text: true,
                    onClick: () => handleUpdatePod(row.name)
                  },
                  {
                    default: () => h(NIcon, { size: 18 }, { default: () => h(EditIcon) })
                  }
                )
            }
          ),
          h(
            NTooltip,
            {
              trigger: 'hover'
            },
            {
              default: () => '暴露Pod',
              trigger: () =>
                h(
                  NButton,
                  {
                    size: 'large',
                    type: 'primary',
                    text: true,
                    onClick: () => handleExposePod(row.name)
                  },
                  {
                    default: () => h(NIcon, { size: 18 }, { default: () => h(PortIcon) })
                  }
                )
            }
          ),
          h(
            NTooltip,
            {
              trigger: 'hover'
            },
            {
              default: () => '删除Pod',
              trigger: () =>
                h(
                  NButton,
                  {
                    size: 'large',
                    type: 'warning',
                    text: true,
                    onClick: () => handleDeletePod(row.name)
                  },
                  {
                    default: () => h(NIcon, { size: 18 }, { default: () => h(DeleteIcon) })
                  }
                )
            }
          )
        ]
      )
    }
  }
]
</script>
