<template>
  <div>
    <h1 class="text-4xl m-5 mainText">List of Random People</h1>
    <div>
      <div class="flex flex-row justify-end m-5">
        <p class="m-1">Filter Gender by: </p>
        <select class="text-black cursor-pointer"
        v-model="genderSelect" @change="fetchUsers(0)" >
          <option v-for="gender in Selections" :key="gender">{{ gender }}</option>
        </select>
      </div>
      <div class="flex m-10">
        <PaginationButtons @page="paginate" :disabled="disabled" :page="pageNum" />
      </div>
      <div class="mainGrid">
        <div v-if="isLoading" class="col-start-2 col-end-4">
          <LoadingView/>
        </div>
        <div v-if="!isLoading && didFail" class="col-start-2 col-end-4">
          <FailedToFetch/>
        </div>
        <div v-else class="gridItem"
          v-for="(user, userIndex) in users" :key="userIndex"
          @keydown="openModal(user)"
          @click="openModal(user)">
          <img class="w-auto h-auto p-10 rounded-full" :src= "user.picture.large" alt="userImage">
          <div class="p-5">
            <div>
              <p class="mainText"> {{ user.name.title }}
              {{ user.name.first }} {{ user.name.last }} </p>
              <p class="font-sans font-semibold"> {{ user.gender }} {{ user.dob.age }} </p>
            </div>
          </div>
        </div>
        <UserModal v-if="isOpen" @close="closeModal" :userData="modalUserData"></UserModal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watchEffect,
} from 'vue';
import UserModal from '@/components/user-modal.vue';
import LoadingView from '@/components/loading.vue';
import FailedToFetch from '@/components/failed-to-fetch.vue';
import PaginationButtons from '@/components/pagination-buttons.vue';
import useUsers from '@/composables/use-users';
import Selections from '@/enums/selections';

export default defineComponent({
  name: 'RandomUserList',
  components: {
    UserModal,
    LoadingView,
    FailedToFetch,
    PaginationButtons,
  },
  emits: ['page'],
  props: {
  },
  setup() {
    const {
      users,
      pageNum,
      genderSelect,
      isOpen,
      isLoading,
      didFail,
      modalUserData,
      fetchUsers,
      openModal,
      closeModal,
    } = useUsers();

    const disabled = ref(isLoading.value || didFail.value);

    watchEffect(() => {
      disabled.value = isLoading.value || didFail.value;
    });

    onMounted(() => {
      fetchUsers(0);
    });

    function paginate(page: number) {
      pageNum.value = page;
      fetchUsers(page);
    }

    return {
      users,
      pageNum,
      genderSelect,
      isOpen,
      isLoading,
      didFail,
      modalUserData,
      disabled,
      fetchUsers,
      openModal,
      closeModal,
      paginate,
      Selections,
    };
  },
});
</script>
