import axios from "axios";
import hefengjwtConstant from "@/utils/hefengjwtConstant.js";

export const getWeatherApi = (id) => {
  return axios.get('https://devapi.qweather.com/v7/weather/now', {
    params: {
      location: id,
      key: hefengjwtConstant.apiKey
    },
    timeout: 5000
  })
}
