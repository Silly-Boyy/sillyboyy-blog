import {defineStore} from "pinia";
import {ref} from "vue";
import {getWeatherApi} from "@/apis/weather.js";
import {useLocationStore} from "@/stores/index.js";

export const useWeatherStore = defineStore('sillyboyy-weather', () => {
  const weather = ref(null)
  const loading = ref(false)
  const useLocation = useLocationStore();
  const fetchWeather = async () => {
    loading.value = true
    try {
      await useLocation.fetchLocation()
      const id = useLocation.location.locationId
      const res = await getWeatherApi(id)
      weather.value = res.data.now
    } catch (err) {
      console.error(err)
    }
    loading.value = false
  }

  return {
    weather,
    loading,
    fetchWeather
  }
});
