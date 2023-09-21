<template>
  <div
    class="fixed w-full top-0 h-12 px-12 py-1 flex shadow-[0_3px_5px_rgba(0,10,20,0.08)] bg-clip-padding backdrop-filter backdrop-blur-xl"
  >
    <router-link to="/image" class="flex-none self-center h-8">
      <img :src="BrandImg" alt="logo" class="h-8" />
    </router-link>
    <div
      class="grow min-w-fit flex mx-14 text-base text-gray-400 font-medium text-center"
      :style="{ fontFamily: 'buding' }"
    >
      <router-link
        class="inline-block px-4 py-2 min-w-fit"
        :class="{
          'text-[#63e2b7]': inImage,
          'border-[#63e2b7]': inImage,
          'border-b-2': inImage
        }"
        to="/image"
      >
        Image
      </router-link>
      <router-link
        class="inline-block px-4 py-2 min-w-fit"
        :class="{
          'text-[#63e2b7]': inContainer,
          'border-[#63e2b7]': inContainer,
          'border-b-2': inContainer
        }"
        to="/pod"
      >
        Pod
      </router-link>
      <!-- <router-link
        class="inline-block px-4 py-2 min-w-fit"
        :class="{
          'text-[#63e2b7]': inService,
          'border-[#63e2b7]': inService,
          'border-b-2': inService
        }"
        to="/service"
      >
        Service
      </router-link> -->
    </div>
    <div class="flex-none w-32 flex justify-around">
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-avatar round size="large" class="bg-gray-400 text-lg"> K </n-avatar>
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { NAvatar, NDropdown, NText } from 'naive-ui'
import BrandImg from '/kpass.svg'
import useUserStore from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()
const { setUserId } = useUserStore()
const inImage = computed(() => route.name === 'image')
const inContainer = computed(() => route.name === 'pod')
// const inService = computed(() => route.name === 'service')
// right part: icons

function renderCustomHeader() {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;'
    },
    [
      h(NAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG'
      }),
      h('div', null, [
        h('div', null, [h(NText, { depth: 2 }, { default: () => 'ID: ' + userStore.userId })]),
        h('div', { style: 'font-size: 12px;' }, [
          h(NText, { depth: 3 }, { default: () => '点击切换用户' })
        ])
      ])
    ]
  )
}

const options = [
  {
    key: 'header',
    type: 'render',
    render: renderCustomHeader
  },
  {
    key: 'header-divider',
    type: 'divider'
  },
  {
    label: '用户ID:123',
    key: '123'
  },
  {
    label: '用户ID:456',
    key: '456'
  }
]

function handleSelect(key: string) {
  setUserId(key)
}
</script>

<style scoped></style>
@/stores/config
