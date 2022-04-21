<template>
    <div class="w-auto h-auto p-10 rounded-full">
        <i class="pi pi-exclamation-circle text-8xl" ></i>
        <p class="p-5">Unable to fetch users at the moment. Please try again later</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FailedToFetch',
});
</script>
