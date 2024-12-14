import {defineStore} from "pinia";

export const useLocationStore = defineStore('sillyboyy-location', () => {
  const location = {
    adm1: '',
    adm2: '',
    name: ''
  }
  const setLocation = (adm1, adm2, name) => {
    location.adm1 = adm1
    location.adm2 = adm2
    location.name = name
  }
  return {
    location,
    setLocation
  }
})
