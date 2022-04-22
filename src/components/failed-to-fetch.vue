<template>
    <div class="w-auto h-auto p-10 rounded-full">
        <i class="pi pi-exclamation-circle text-8xl" ></i>
        <p class="p-5 font-bold">Unable to fetch users at the moment. Please try again later</p>
        <p class="p-5 font-semibold text-red-600">{{ error }} </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FailedToFetch',
  props: {
    error: { type: String, required: true },
  },
});
</script>
