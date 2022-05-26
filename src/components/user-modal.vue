<template>
    <div class="modalBackdrop"
    @click="close"
    @keydown="close">
    <div class="modal"
    @click.stop
    @keydown.stop>
      <div class="modalHeader">
        <div class="flex flex-col">
          <div class="justify-center m-6">
            <img class="w-auto h-auto m-auto border-white border-4 rounded-full"
          :src= "userData.picture.large" alt="userImage">
          </div>
          <div class="mainText">
            {{ userData.name.title }} {{ userData.name.first }} {{ userData.name.last }}
          </div>
          <div class="font-sans font-semibold">
            {{ userData.dob.age }}, {{ userData.gender }}
          </div>
        </div>
        <button
          type="button"
          class="btnClose"
          @click="close"
        >
          x
        </button>
      </div>

      <div class="modalBody">
        <div class="font-mono font-semibold">
          {{ currentTab }}
        </div>
        <div class="font-sans underline">
          {{ currentTabData }}
        </div>
      </div>

      <div class="modalFooter">
        <div  v-for="(value, key, index) in TabClasses" :key="index">
          <div
          class="hover:modalTabActive"
          :class="`tab ` + value"
          @mouseover="selectTab(index)"
          @focus="selectTab(index)"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  PropType,
  watchEffect,
  computed,
} from 'vue';
import { User } from '@/interfaces/IUser';
import userModal from '@/composables/use-modal';
import { Tabs, TabClasses } from '@/enums/tab';

export default defineComponent({
  name: 'UserModal',
  props: {
    userData: { type: Object as PropType<User>, required: true },
  },
  setup(props, { emit }) {
    const {
      currentTab,
      currentTabData,
      indexHovered,
      modalData,
      selectTab,
      updateCurrentTabDataOnShow,
    } = userModal();

    const tab = ref('modalTab');
    const tabActive = ref('modalTabActive');

    watchEffect(() => {
      modalData.value = props.userData;
      updateCurrentTabDataOnShow();
    });

    function close() {
      emit('close');
    }

    return {
      currentTab,
      currentTabData,
      indexHovered,
      tab,
      tabActive,
      close,
      selectTab,
      Tabs,
      TabClasses,
    };
  },
});
</script>
