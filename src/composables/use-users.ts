import { Ref, ref, watchEffect } from 'vue';
import useApi from '@/composables/use-api';
import { User } from '@/interfaces/IUser';
import Selections from '@/enums/selections';

export default function useUsers() {
  const userList:Ref<User[]> = ref([]);
  const users = ref();
  const pageNum = ref(1);
  const genderSelect = ref(Selections.All);
  const isLoading = ref(true);
  const didFail = ref(false);
  const isOpen = ref(false);
  const modalUserData = ref();
  const errorMessage = ref('');

  const url = 'https://randomuser.me/api/?';
  const resultLimit = 8;
  const params = new URLSearchParams();
  params.set('results', resultLimit.toString());
  const options = {
    methods: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { get } = useApi();

  function getFromApi() {
    isLoading.value = true;
    didFail.value = false;
    users.value = [];
    params.set('page', pageNum.value.toString());
    params.set('gender', genderSelect.value);
    const request = new Request(`${url}${params}`, options);

    get(request)
      .then((response) => {
        isLoading.value = false;
        users.value = response;
        users.value = users.value.results;
        userList.value.push(users.value);
      })
      .catch((err) => {
        isLoading.value = false;
        didFail.value = true;
        errorMessage.value = `${err.name}: ${err.message}`;
      });
  }

  function fetchUsers(index: number) {
    if (index === 0) {
      userList.value = [];
      pageNum.value = 1;
      getFromApi();
    } else if (index > userList.value.length) {
      getFromApi();
    } else {
      users.value = userList.value[index - 1];
    }
  }

  function openModal(user:User) {
    modalUserData.value = user;
    isOpen.value = true;
  }

  function closeModal() {
    modalUserData.value = [];
    isOpen.value = false;
  }

  return {
    users,
    genderSelect,
    pageNum,
    isOpen,
    modalUserData,
    isLoading,
    didFail,
    errorMessage,
    fetchUsers,
    openModal,
    closeModal,
  };
}
