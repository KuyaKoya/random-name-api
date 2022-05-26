import { ref } from 'vue';
import { Tabs } from '@/enums/tab';

export default function userModal() {
  const currentTab = ref(Tabs.Email);
  const currentTabData = ref();
  const modalData = ref();
  const indexHovered = ref(1);

  function updateCurrentTabDataOnShow() {
    currentTabData.value = modalData.value.email;
  }

  function getBirthday(): string {
    const birthday = modalData.value.dob.date;
    return birthday.slice(0, 10);
  }

  function getAddress(): string {
    const street = `${modalData.value.location.street.number} 
    ${modalData.value.location.street.name}`;
    const { city, state, country } = modalData.value.location;

    return `${street}, ${city}, ${state}, ${country}`;
  }

  function getLogin(): string {
    const { username } = modalData.value.login;

    return `${username}`;
  }

  function selectTab(index: number) {
    indexHovered.value = index;
    switch (index) {
      case 1:
        currentTab.value = Tabs.Email;
        currentTabData.value = modalData.value.email;
        break;
      case 2:
        currentTab.value = Tabs.Birthday;
        currentTabData.value = getBirthday();
        break;
      case 3:
        currentTab.value = Tabs.Address;
        currentTabData.value = getAddress();
        break;
      case 4:
        currentTab.value = Tabs.PhoneNumber;
        currentTabData.value = modalData.value.phone;
        break;
      case 5:
        currentTab.value = Tabs.Login;
        currentTabData.value = getLogin();
        break;
      default:
    }
  }

  return {
    currentTab,
    currentTabData,
    indexHovered,
    modalData,
    selectTab,
    updateCurrentTabDataOnShow,
  };
}
