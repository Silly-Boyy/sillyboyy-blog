import axios from "axios";
import Apikey from "@/utils/PrivateKey.js";

export const getWeatherApi = (lat, lng) => {
  lat = lat.toFixed(2)
  lng = lng.toFixed(2)
  return axios.get('https://devapi.qweather.com/v7/weather/now', {
    params: {
      location: `${lng},${lat}`,
      key: Apikey.hefengApiKey
    }
  })
}
