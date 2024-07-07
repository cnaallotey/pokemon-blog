<script setup>
const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
    limit: {
        type: Number,
        default: 3
    }
})

const emit = defineEmits(['goToPage'])

const allArticles = await queryContent('blog').count()

const totalPages = computed(() => Math.ceil(allArticles / props.limit));
</script>

<template>
   <ClientOnly>
   
    <div class="flex justify-center mt-10">
      <div class="flex items-center gap-4">
        <UTooltip text="Previous page">
          <UButton
            icon="i-heroicons-arrow-small-left-20-solid"
            :ui="{ rounded: 'rounded-full' }"
            :disabled="currentPage === 1"
            class="rtl:[&_span:first-child]:rotate-180 me-2 bg-yellow-500 hover:bg-yellow-600 disabled:invisible"
            @click="emit('goToPage', currentPage - 1)"
          />
        </UTooltip>
        <button
          v-for="i in totalPages"
          :key="i"
          @click="emit('goToPage', i)"
          class="text-2xl font-semibold px-4 py-2 rounded-md border border-yellow-400 disabled:invisible"
          :class="{ 'bg-yellow-500 text-white': currentPage === i }"
        >
          {{ i }}
        </button>
        <UTooltip text="Next page">
          <UButton
            icon="i-heroicons-arrow-small-right-20-solid"
            :ui="{ rounded: 'rounded-full' }"
            :disabled="currentPage === totalPages"
            class="rtl:[&_span:last-child]:rotate-180 ms-2 bg-yellow-500 hover:bg-yellow-600 disabled:invisible"
            @click="emit('goToPage', currentPage + 1)"
          />
        </UTooltip>
      </div>
    </div>
   </ClientOnly>
</template>