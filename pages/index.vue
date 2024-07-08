<script setup>
const route = useRoute()
const currentPage = computed(() => parseInt(route.query.page) || 1);
const limit = ref(3);

const { data:blog, refresh } = await useAsyncData("blog", () => 
    queryContent("/blog")
    .skip((currentPage.value - 1) * limit.value)
    .limit(limit.value)
    .find()
)

watch(() => route.query, () => refresh())
</script>

<template>
  <div class="w-full">
    <div class="w-full py-40 bg-gray-100 px-4 flex flex-col items-center">
      <img src="/images/pok.webp" class="h-32 w-auto md:shrink-0" />
      <h1 class="text-4xl font-bold text-center -mt-5">My Pokemon Blog</h1>
    </div>
    <div
      class="max-w-7xl bg-white rounded-3xl shadow-md -mt-20 mx-auto p-10 grid grid-cols-3 gap-10"
    >
      <UCard v-for="item in blog" :key="item.title">
        <template #header>
          <h2 class="text-2xl font-bold">{{ item.title }}</h2>
        </template>
        <img
          src="/images/blog-pok.webp"
          class="w-full"
          :alt="`image for ${item.title} article`"
        />
        <p class="mt-4 font-medium text-gray-500">{{ item.description }}</p>
        <template #footer>
          <ULink
            :to="item._path"
            class="hover:underline text-blue-500 hover:text-blue-500"
            >Read More</ULink
          >
        </template>
      </UCard>
    </div>
    <Pagination v-bind="{ currentPage, limit }" />
  </div>
</template>
