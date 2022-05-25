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
        <div class="tab pi pi-envelope"
         :class="[indexHovered == 1 ? tabActive : tab]"
         @mouseover="selectTab(1)"
         @focus="selectTab(1)">
        </div>
        <div class="tab pi pi-calendar"
         :class="[indexHovered == 2 ? tabActive : tab]"
         @mouseover="selectTab(2)"
         @focus="selectTab(2)">
        </div>
        <div class="tab pi pi-map"
         :class="[indexHovered == 3 ? tabActive : tab]"
         @mouseover="selectTab(3)"
         @focus="selectTab(3)">
        </div>
        <div class="tab pi pi-phone"
         :class="[indexHovered == 4 ? tabActive : tab]"
         @mouseover="selectTab(4)"
         @focus="selectTab(4)">
        </div>
        <div class="tab pi pi-id-card"
         :class="[indexHovered == 5 ? tabActive : tab]"
         @mouseover="selectTab(5)"
         @focus="selectTab(5)">
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
} from 'vue';
import { User } from '@/interfaces/IUser';
import userModal from '@/composables/user-modal';
import Tabs from '@/enums/tab';

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
    };
  },
});
</script>
