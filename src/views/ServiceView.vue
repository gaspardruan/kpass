<template>
  <div class="py-3 w-4/5 mx-auto">
    <table-header title="Service" />

    <div :style="{ fontFamily: 'en-content' }">
      <n-data-table :single-line="false" :columns="columns" :data="data" :pagination="pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NTag, NButton, NIcon, useMessage, NTooltip } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import {
  SettingsSharp as EditIcon,
  TrashBinSharp as DeleteIcon,
  AddSharp as CreateIcon
} from '@vicons/ionicons5'
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

const pagination = {
  pagination: 10
}

const message = useMessage()
const sendMail = (pod: Pod) => {
  message.info('send mail to ' + pod.name)
}

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
    width: 90
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
                    onClick: () => sendMail(row)
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
                    onClick: () => sendMail(row)
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
