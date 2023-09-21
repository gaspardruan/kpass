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
      <n-avatar round size="large" class="bg-gray-400 text-lg"> K </n-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BrandImg from '/kpass.svg'

const route = useRoute()

const inImage = computed(() => route.name === 'image')
const inContainer = computed(() => route.name === 'pod')
// const inService = computed(() => route.name === 'service')
// right part: icons
</script>

<style scoped></style>
@/stores/config
