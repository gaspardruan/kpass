<template>
  <div class="py-3 w-4/5 mx-auto">
    <div class="flex justify-between">
      <div class="flex py-2">
        <n-gradient-text :size="32" type="success" class="font-bold leading-relaxed tracking-wide">
          镜像
        </n-gradient-text>
        <div class="text-gray-500 self-center ml-3">镜像管理界面</div>
      </div>
      <n-button type="primary" class="py-2 self-center">创建镜像</n-button>
    </div>

    <div :style="{ fontFamily: 'en-content' }">
      <n-data-table :single-line="false" :columns="columns" :data="data" :pagination="pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NTag, NButton, NIcon, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import {
  PlaySharp as PlayIcon,
  SettingsSharp as EditIcon,
  TrashBinSharp as DeleteIcon
} from '@vicons/ionicons5'
const data: Image[] = [
  {
    id: 784414112576,
    name: 'John Brown',
    size: 1024,
    tags: ['nice', 'developer'],
    createdAt: '2021-09-01 12:00:00'
  },
  {
    id: 1,
    name: 'Jim Green',
    size: 1023,
    tags: ['wow'],
    createdAt: '2021-09-01 12:00:00'
  },
  {
    id: 2,
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
const sendMail = (Image: Image) => {
  message.info('send mail to ' + Image.name)
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
    title: 'ID',
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
    width: 200,
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
            NButton,
            {
              size: 'large',
              type: 'primary',
              text: true,
              onClick: () => sendMail(row)
            },
            [h(NIcon, { size: 18 }, [h(PlayIcon)])]
          ),
          h(
            NButton,
            {
              size: 'large',
              type: 'primary',
              text: true,
              onClick: () => sendMail(row)
            },
            [h(NIcon, { size: 18 }, [h(EditIcon)])]
          ),
          h(
            NButton,
            {
              size: 'large',
              type: 'warning',
              text: true,
              onClick: () => sendMail(row)
            },
            [h(NIcon, { size: 18 }, [h(DeleteIcon)])]
          )
        ]
      )
    }
  }
]
</script>
