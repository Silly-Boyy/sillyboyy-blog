import axios from "axios";
import hefengjwtConstant from "@/utils/hefengjwtConstant.js";

export const getWeatherApi = (x, y) => {
  return axios.get('https://devapi.qweather.com/v7/weather/now', {
    params: {
      location: `${x},${y}`,
      key: hefengjwtConstant.apiKey
    }
  })
}
