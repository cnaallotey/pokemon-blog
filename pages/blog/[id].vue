<script setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

const [prev, next] = await queryCollectionItemSurroundings(
  'content',
  route.path,
  {
    fields: ['path', 'title']
  }
)
</script>

<template>
  <div class="w-full pb-10">
    <div class="w-full pb-40 pt-20 bg-gray-100 px-4 flex flex-col items-center">
      <NuxtLink to="/"
        ><img src="/images/pok.webp" class="h-auto w-80 md:shrink-0"
      /></NuxtLink>
      <h1 class="text-5xl font-bold text-center -mt-7">{{ page.title }}</h1>
    </div>
    <div
      class="max-w-7xl bg-white rounded-3xl flex flex-col items-center shadow-md -mt-20 mx-auto p-10 gap-10"
    >
      <img
        src="/images/blog-pok.webp"
        class="max-w-3xl rounded-2xl"
        :alt="`image for ${page.title} article`"
      />
      <ContentRenderer v-if="page" :value="page" />
    </div>
    <div class="flex justify-center mt-10">
      <div class="flex items-center gap-4">
        <UTooltip text="Previous">
          <UButton
            icon="i-heroicons-arrow-small-left-20-solid"
            label="Previous Pokemon"
            :ui="{ rounded: 'rounded-full' }"
            :disabled="!prev"
            class="rtl:[&_span:first-child]:rotate-180 me-2 bg-yellow-500 hover:bg-yellow-600 disabled:invisible"
            @click="navigateTo(prev.path)"
          />
        </UTooltip>
        <UTooltip text="Next">
          <UButton
            icon="i-heroicons-arrow-small-right-20-solid"
            label="Next Pokemon"
            :disabled="!next"
            :ui="{ rounded: 'rounded-full' }"
            class="rtl:[&_span:last-child]:rotate-180 ms-2 flex-row-reverse bg-yellow-500 hover:bg-yellow-600 disabled:invisible"
            @click="navigateTo(next.path)"
          />
        </UTooltip>
      </div>
    </div>
  </div>
</template>
