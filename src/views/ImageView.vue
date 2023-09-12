<template>
  <div class="py-3 w-4/5 mx-auto">
    <div class="flex justify-between">
      <div class="flex py-2">
        <n-gradient-text :size="32" type="success" class="font-bold leading-relaxed tracking-wide">
          镜像
        </n-gradient-text>
        <div class="text-gray-500 self-center ml-3">镜像管理界面</div>
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

    <n-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      :mask-closable="false"
      :style="{ width: '600px', height: '450px' }"
      title="创建镜像"
      size="huge"
      :bordered="false"
      :closable="false"
    >
      <n-tabs type="line" animated @update:value="handleTabUpdate">
        <n-tab-pane name="fromDockerfile" tab="Dockerfile">
          <n-input v-model:value="dockerfile" type="textarea" rows="9" placeholder="dockerfile" />
        </n-tab-pane>
        <n-tab-pane name="fromSource" tab="源代码压缩包">
          <n-upload
            ref="uploadFromSource"
            directory-dnd
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            class="h-52"
            :default-upload="false"
          >
            <n-upload-dragger>
              <div>
                <n-icon size="48" :depth="3">
                  <archive-icon />
                </n-icon>
              </div>
              <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0"> 请上传包含Dockerfile的源代码压缩包 </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-tab-pane>
        <n-tab-pane name="fromImage" tab="镜像文件">
          <n-upload
            ref="uploadFromImage"
            directory-dnd
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            class="h-52"
            :default-upload="false"
          >
            <n-upload-dragger>
              <div>
                <n-icon size="48" :depth="3">
                  <archive-icon />
                </n-icon>
              </div>
              <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0"> 请上传镜像文件 </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-tab-pane>
        <n-tab-pane name="fromCodeHub" tab="代码仓库地址">
          <n-input-group class="py-8">
            <n-tag size="large"> 代码仓库地址 </n-tag>
            <n-input v-model:value="codeHubURL" :input-props="{ type: 'url' }" placeholder="URL" />
          </n-input-group>
        </n-tab-pane>
        <n-tab-pane name="fromPublicHub" tab="公共仓库镜像"> 公共仓库镜像 </n-tab-pane>
      </n-tabs>
      <template #footer>
        <div class="flex w-32 mx-auto justify-between">
          <n-button @click="closeModal">取消</n-button>
          <n-button type="primary" @click="createImage">提交</n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { NTag, NButton, NIcon, NTooltip, useMessage } from 'naive-ui'
import type { DataTableColumns, UploadInst } from 'naive-ui'
import {
  PlaySharp as PlayIcon,
  SettingsSharp as EditIcon,
  TrashBinSharp as DeleteIcon,
  AddSharp as CreateIcon,
  ArchiveOutline as ArchiveIcon
} from '@vicons/ionicons5'

const showModal = ref(false)
const curTab = ref('fromdockerfile')
const dockerfile = ref('')
const codeHubURL = ref('')
const uploadFromSourceRef = ref<UploadInst | null>(null)
const uploadFromImageRef = ref<UploadInst | null>(null)
const handleTabUpdate = (tab: string) => {
  curTab.value = tab
}

const cleanTab = () => {
  showModal.value = false
  dockerfile.value = ''
  codeHubURL.value = ''
  curTab.value = 'fromDockerfile'
}

const closeModal = () => {
  cleanTab()
}
const createImage = () => {
  if (curTab.value === 'fromSource') {
    uploadFromSourceRef.value?.submit()
  } else if (curTab.value === 'fromImage') {
    uploadFromImageRef.value?.submit()
  } else if (curTab.value === 'fromCodeHub') {
    console.log('fromCodeHub')
  } else if (curTab.value === 'fromPublicHub') {
    console.log('fromPublicHub')
  } else {
    console.log('fromDockerfile')
  }

  cleanTab()
}

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
                    onClick: () => sendMail(row)
                  },
                  [h(NIcon, { size: 18 }, [h(PlayIcon)])]
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
                    onClick: () => sendMail(row)
                  },
                  [h(NIcon, { size: 18 }, [h(EditIcon)])]
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
                    onClick: () => sendMail(row)
                  },
                  [h(NIcon, { size: 18 }, [h(DeleteIcon)])]
                )
            }
          )
        ]
      )
    }
  }
]
</script>
