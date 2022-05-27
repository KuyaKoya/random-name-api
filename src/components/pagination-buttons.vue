<template>
  <button
    :class="[buttonStatus]"
    :disabled="disabled"
    v-if="pageNum > 1"
    @click="prevPage()"
  >
    Prev
  </button>
  <button
    :class="[buttonStatus]"
    :disabled="disabled"
    @click="nextPage()"
  >
    Next
  </button>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watchEffect,
} from 'vue';
import useUsers from '@/composables/use-users';

export default defineComponent({
  name: 'PaginationButtons',
  emits: ['page'],
  props: {
    disabled: { type: Boolean, required: true },
    page: { type: Number, required: true },
  },
  setup(props, { emit }) {
    const {
      pageNum,
    } = useUsers();

    const buttonDisabled = ref('paginationButtonsDisabled');
    const buttonActive = ref('paginationButtons');

    const buttonStatus = computed(() => (
      props.disabled ? buttonDisabled.value : buttonActive.value));
    watchEffect(() => {
      pageNum.value = props.page;
    });

    function nextPage() {
      pageNum.value += 1;
      emit('page', pageNum.value);
    }

    function prevPage() {
      pageNum.value -= 1;
      emit('page', pageNum.value);
    }

    return {
      pageNum,
      buttonDisabled,
      buttonActive,
      buttonStatus,
      nextPage,
      prevPage,
    };
  },
});
</script>
