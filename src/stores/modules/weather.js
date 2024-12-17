import {defineStore} from "pinia";
import {ref} from "vue";
import {getWeatherApi} from "@/apis/weather.js";
import {useLocationStore} from "@/stores/index.js";

export const useWeatherStore = defineStore('sillyboyy-weather', () => {
  const weather = ref(null)
  const loading = ref(false)
  const useLocation = useLocationStore();
  const fetchWeather = async () => {
    if (weather.value && new Date().getTime() - weather.value.time < 1000 * 60) return
    loading.value = true
    try {
      if (!useLocation.location) await useLocation.fetchLocation();
      const {lat, lng} = useLocation.location.location
      const res = await getWeatherApi(lat, lng)
      weather.value = res.data.now
      weather.value.time = new Date().getTime()
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
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['weather'],
      }
    ]
  }
});
