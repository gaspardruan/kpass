<template>
  <div class="py-3 w-4/5 mx-auto">
    <div class="flex justify-between">
      <div class="flex py-2" :style="{ fontFamily: 'en-title' }">
        <n-gradient-text :size="32" type="success" class="font-bold leading-relaxed tracking-wide">
          Image
        </n-gradient-text>
        <div class="text-gray-400 self-center ml-3">Image管理界面</div>
      </div>
      <n-button circle type="primary" class="py-2 self-center" @click="showModal = true">
        <template #icon>
          <n-icon size="24"><create-icon /></n-icon>
        </template>
      </n-button>
    </div>

    <div :style="{ fontFamily: 'en-content' }">
      <n-tabs type="line" animated>
        <n-tab-pane name="privateImage" tab="私有镜像">
          <n-data-table
            :single-line="false"
            :columns="columns"
            :data="data"
            :pagination="pagination"
          />
        </n-tab-pane>
        <n-tab-pane name="publicImage" tab="公共镜像">
          <n-data-table
            :single-line="false"
            :columns="columns"
            :data="data"
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
import { h, ref } from 'vue'
import { NTag, NButton, NIcon, NTooltip, useMessage, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import {
  PlaySharp as PlayIcon,
  SettingsSharp as EditIcon,
  TrashBinSharp as DeleteIcon,
  AddSharp as CreateIcon
} from '@vicons/ionicons5'

const showModal = ref(false)
const showCreatePodModal = ref(false)
const showModifyPodModal = ref(false)

const imageID = ref('')
const imageName = ref('')

const modifyImageName = ref('')

const data: Image[] = [
  {
    id: '784414112576',
    name: 'John Brown',
    size: 1024,
    tags: ['nice', 'developer'],
    createdAt: '2021-09-01 12:00:00'
  },
  {
    id: '1',
    name: 'Jim Green',
    size: 1023,
    tags: ['wow'],
    createdAt: '2021-09-01 12:00:00'
  },
  {
    id: '2',
    name: 'Joe Black',
    size: 32,
    tags: ['cool', 'teacher'],
    createdAt: '2021-09-01 12:00:00'
  }
]

const pagination = {
  pagination: 10
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
    return size + 'MB'
  } else {
    return (size / 1024).toFixed(2) + 'GB'
  }
}

const columns: DataTableColumns<Image> = [
  {
    title: '镜像ID',
    key: 'id',
    width: 130,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '镜像名称',
    key: 'name',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '镜像标签',
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
    title: '镜像大小',
    key: 'size',
    width: 85,
    render: (row) => {
      return normalSize(row.size)
    }
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 150,
    ellipsis: {
      tooltip: true
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
                      imageName.value = row.name
                    }
                  },
                  {
                    default: () => h(NIcon, { size: 18 }, { default: () => h(PlayIcon) })
                  }
                )
            }
          ),
          h(
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
                      modifyImageName.value = row.name
                    }
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
                    onClick: () => handleDeleteImage(row.id, row.name)
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
