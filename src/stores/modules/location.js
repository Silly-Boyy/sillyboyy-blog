import {defineStore} from "pinia";
import {ref} from "vue";

export const useLocationStore = defineStore('sillyboyy-location', () => {
  const location = ref({
    adm1: '',
    adm2: '',
    name: ''
  })
  const setLocation = (adm1, adm2, name) => {
    location.value.adm1 = adm1
    location.value.adm2 = adm2
    location.value.name = name
  }
  return {
    location,
    setLocation
  }
})
