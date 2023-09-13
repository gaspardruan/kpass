<template>
  <div class="py-3 w-4/5 mx-auto">
    <table-header title="Service" />

    <div class="py-4">
      <n-text type="info"> 节点IP：{{ nodeIP }} </n-text>
    </div>

    <div :style="{ fontFamily: 'en-content' }">
      <n-data-table :single-line="false" :columns="columns" :data="data" :pagination="pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { NTag, NButton, NIcon, useMessage, NTooltip } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { SettingsSharp as EditIcon, TrashBinSharp as DeleteIcon } from '@vicons/ionicons5'

const nodeIP = ref('192.168.1.1')

const data: Service[] = [
  {
    name: 'nginx-service',
    type: 'ClusterIP',
    clusterIP: '192.168.137.1',
    externalIP: '-',
    ports: ['80:30080/TCP'],
    age: '1d'
  }
]

const pagination = {
  pagination: 10
}

const message = useMessage()
const sendMail = (pod: Service) => {
  message.info('send mail to ' + pod.name)
}

const columns: DataTableColumns<Service> = [
  {
    title: 'Service名称',
    key: 'name',
    width: 150,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '类型',
    key: 'type',
    width: 90
  },
  {
    title: '集群IP',
    key: 'clusterIP',
    width: 120
  },
  {
    title: '外部IP',
    key: 'externalIP',
    width: 120
  },
  {
    title: '运行时长',
    key: 'age',
    width: 90
  },
  {
    title: '端口',
    key: 'ports',
    render(row) {
      const tags = row.ports.map((port) => {
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
            default: () => port
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
