<template>
  <div class="py-3 w-4/5 mx-auto">
    <table-header title="Pod" @click="showCreateDeployModal = true" />

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

    <create-deploy-modal v-model:show="showCreateDeployModal" @deployCreated="reloadData" />
    <update-deploy-modal
      v-model:show="showUpdateDeployModal"
      :deploymentName="toUpdateDeployName"
      @deployUpdated="reloadData"
    />

    <!-- <expose-deploy-modal v-model:show="showExposeDeployModal" :deployName="exposeDeployName" /> -->
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

import { getDeployList, getPodList, deletePod, deleteDeploy, exposeDeployRandom } from '@/api/pod'

const message = useMessage()
const dialog = useDialog()

const showCreateDeployModal = ref(false)
const showUpdateDeployModal = ref(false)
// const showExposeDeployModal = ref(false)

// const exposeDeployName = ref('')
const handleExposeDeploy = (deployName: string) => {
  // showExposeDeployModal.value = true
  // exposeDeployName.value = deployName

  exposeDeployRandom(deployName).then((res) => {
    if (res.status === 200) {
      dialog.success({
        title: '暴露Deployment',
        content: '暴露Deployment: ' + deployName + '成功，地址为: ' + res.data,
        positiveText: '跳转',
        negativeText: '取消',
        onPositiveClick: () => {
          window.open('http://' + res.data)
        }
      })
    } else {
      message.warning('暴露Deployment失败')
    }
  })
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
      deletePod(podName).then((res) => {
        if (res.data === true) {
          message.success('删除Pod: ' + podName + '成功')
          data.value = data.value.filter((pod) => pod.name != podName)
        } else {
          message.error('删除失败')
        }
      })
    }
  })
}

const handleDeleteDeploy = (deployName: string) => {
  dialog.warning({
    title: '删除 Deployment',
    content: '确定删除Deployment ' + deployName + ' 吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      deleteDeploy(deployName).then((res) => {
        if (res.data === true) {
          message.success('删除Deployment: ' + deployName + '成功')
          deployData.value = deployData.value.filter((deploy) => deploy.name != deployName)
        } else {
          message.error('删除失败')
        }
      })
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
    data.value = res.data.podInfoList.reverse()
  })
  getDeployList().then((res) => {
    deployData.value = res.data.deploymentListInfoList.reverse()
  })
})

const reloadData = () => {
  setTimeout(() => {
    getPodList().then((res) => {
      data.value = res.data.podInfoList.reverse()
    })
    getDeployList().then((res) => {
      deployData.value = res.data.deploymentListInfoList.reverse()
    })
  }, 100)
}

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
              default: () => '暴露Deployment',
              trigger: () =>
                h(
                  NButton,
                  {
                    size: 'large',
                    type: 'primary',
                    text: true,
                    onClick: () => handleExposeDeploy(row.name)
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
