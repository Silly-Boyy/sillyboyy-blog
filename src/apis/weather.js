import axios from "axios";
import Apikey from "@/utils/PrivateKey.js";

export const getWeatherApi = (id) => {
  return axios.get('https://devapi.qweather.com/v7/weather/now', {
    params: {
      location: id,
      key: Apikey.hefengApiKey
    },
    timeout: 5000
  })
}
