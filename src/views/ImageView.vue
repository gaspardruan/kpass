<template>
  <div class="py-3 w-4/5 mx-auto">
    <table-header title="Image" @click="showModal = true" />

    <div :style="{ fontFamily: 'en-content' }">
      <n-tabs type="line" animated @update:value="handleTabUpdate">
        <n-tab-pane name="privateImage" tab="私有镜像">
          <n-data-table
            :single-line="false"
            :columns="columns"
            :data="privateData"
            :pagination="pagination"
          />
        </n-tab-pane>
        <n-tab-pane name="publicImage" tab="公共镜像">
          <n-data-table
            :single-line="false"
            :columns="columns"
            :data="publicData"
            :pagination="pagination"
          />
        </n-tab-pane>
      </n-tabs>
    </div>

    <create-image v-model:show="showModal" />
    <simple-create-pod
      v-model:show="showCreatePodModal"
      :imageID="imageID"
      :imageName="imageName"
    />
    <modify-image v-model:show="showModifyPodModal" :imageName="modifyImageName" />
  </div>
</template>

<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import { NTag, NButton, NIcon, NTooltip, useMessage, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import {
  PlaySharp as PlayIcon,
  SettingsSharp as EditIcon,
  TrashBinSharp as DeleteIcon
} from '@vicons/ionicons5'

import { getPublicImageList, getUserImageList } from '@/api/image'
import useUserStore from '@/stores/user'

const userStore = useUserStore()

const curTab = ref('privateImage')
const handleTabUpdate = (tab: string) => {
  curTab.value = tab
}

const showModal = ref(false)
const showCreatePodModal = ref(false)
const showModifyPodModal = ref(false)

const imageID = ref('')
const imageName = ref('')

const modifyImageName = ref('')

const publicData = ref<Image[]>([
  {
    id: '',
    imageName: '',
    size: 0,
    labels: [],
    createTime: 0
  }
])

const privateData = ref<Image[]>([
  {
    id: '',
    imageName: '',
    size: 0,
    labels: [],
    createTime: 0
  }
])

const pagination = {
  pageSize: 5
}

const message = useMessage()
const dialog = useDialog()
const handleDeleteImage = (imageID: string, imageName: string) => {
  dialog.warning({
    title: '删除镜像',
    content: '确定删除镜像 ' + imageName + ' 吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('删除镜像' + imageID + '成功')
    }
  })
}

const normalSize = (size: number) => {
  if (size < 1024) {
    return size + 'B'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'KB'
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'MB'
  } else {
    ;(size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
  }
}

onMounted(() => {
  getPublicImageList().then((res) => {
    publicData.value = res.data.infoList
  })

  getUserImageList(userStore.userId).then((res) => {
    privateData.value = res.data.infoList
  })
})

const columns: DataTableColumns<Image> = [
  {
    title: '镜像ID',
    key: 'id',
    width: 200,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '镜像名称',
    key: 'imageName',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '镜像标签',
    key: 'labels',

    ellipsis: {
      tooltip: true
    },
    render(row) {
      if (row.labels === null) return null
      const tags = row.labels.map((tagKey) => {
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
    title: '镜像大小',
    key: 'size',
    width: 85,
    render: (row) => {
      return normalSize(row.size)
    }
  },
  {
    title: '创建时间',
    key: 'createdTime',
    width: 150,
    ellipsis: {
      tooltip: true
    },
    render: (row) => {
      const date = new Date(row.createTime * 1000)
      return date.toLocaleString()
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
              trigger: 'hover',
              delay: 500
            },
            {
              default: () => '从镜像创建Pod',
              trigger: () =>
                h(
                  NButton,
                  {
                    size: 'large',
                    type: 'primary',
                    text: true,
                    onClick: () => {
                      showCreatePodModal.value = true
                      imageID.value = row.id
                      imageName.value = row.imageName
                    }
                  },
                  {
                    default: () => h(NIcon, { size: 18 }, { default: () => h(PlayIcon) })
                  }
                )
            }
          ),
          curTab.value === 'privateImage'
            ? h(
                NTooltip,
                {
                  trigger: 'hover',
                  delay: 500
                },
                {
                  default: () => '修改镜像',
                  trigger: () =>
                    h(
                      NButton,
                      {
                        size: 'large',
                        type: 'primary',
                        text: true,
                        onClick: () => {
                          showModifyPodModal.value = true
                          modifyImageName.value = row.imageName
                        }
                      },
                      {
                        default: () => h(NIcon, { size: 18 }, { default: () => h(EditIcon) })
                      }
                    )
                }
              )
            : null,
          curTab.value === 'privateImage'
            ? h(
                NTooltip,
                {
                  trigger: 'hover',
                  delay: 500
                },
                {
                  default: () => '删除镜像',
                  trigger: () =>
                    h(
                      NButton,
                      {
                        size: 'large',
                        type: 'warning',
                        text: true,
                        onClick: () => handleDeleteImage(row.id, row.imageName)
                      },
                      {
                        default: () => h(NIcon, { size: 18 }, { default: () => h(DeleteIcon) })
                      }
                    )
                }
              )
            : null
        ]
      )
    }
  }
]
</script>
