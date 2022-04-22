<template>
  <div class="home">
    <RandomUserList/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RandomUserList from '@/components/random-user-list.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    RandomUserList,
  },
});
</script>
