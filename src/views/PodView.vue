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

    <mutate-pod v-model:show="showCreatePodModal" type="create" />
    <mutate-pod v-model:show="showUpdatePodModal" type="update" :podName="toUpdatePodName" />
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { NTag, NButton, NIcon, useMessage, NTooltip, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { SettingsSharp as EditIcon, TrashBinSharp as DeleteIcon } from '@vicons/ionicons5'

const message = useMessage()
const dialog = useDialog()

const showCreatePodModal = ref(false)
const showUpdatePodModal = ref(false)

const toUpdatePodName = ref('')
const handleUpdatePod = (podName: string) => {
  showUpdatePodModal.value = true
  toUpdatePodName.value = podName
}

const handleDeletePod = (podName: string) => {
  dialog.warning({
    title: '删除Pod',
    content: '确定删除Pod ' + podName + ' 吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('删除镜像' + podName + '成功')
    }
  })
}

const handleUpdateDeployment = () => {}

const data: Pod[] = [
  {
    name: 'John Brown',
    ready: '100/100',
    status: 'running',
    restarts: 0,
    age: '3d',
    ip: '192.168.137.1',
    node: 'node1',
    tags: []
  },
  {
    name: 'John Brown2',
    ready: '100/100',
    status: 'exited(137)',
    restarts: 0,
    age: '3d',
    ip: '192.168.137.123',
    node: 'node1',
    tags: []
  }
]

const deployData: Deployment[] = [
  {
    name: 'John Brown',
    ready: '3/3',
    upToDate: 3,
    available: 3,
    age: '3d'
  }
]

const pagination = {
  pagination: 10
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
    title: '就绪',
    key: 'ready',
    width: 90
  },
  {
    title: '最新',
    key: 'upToDate',
    width: 90
  },
  {
    title: '可用',
    key: 'available',
    width: 90
  },
  {
    title: '运行时长',
    key: 'age',
    width: 90
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
                    onClick: () => handleUpdateDeployment()
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

const columns: DataTableColumns<Pod> = [
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
    width: 90
  },
  {
    title: '状态',
    key: 'status',
    width: 95
  },
  {
    title: '重启',
    key: 'restarts',
    width: 90
  },
  {
    title: '运行时长',
    key: 'age',
    width: 90
  },
  {
    title: 'IP',
    key: 'ip',
    width: 120,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '节点',
    key: 'node',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '标签',
    key: 'tags',
    ellipsis: {
      tooltip: true
    },
    render(row) {
      const tags = row.tags.map((tagKey) => {
        return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'info',
            bordered: false
          },
          {
            default: () => tagKey
          }
        )
      })
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
