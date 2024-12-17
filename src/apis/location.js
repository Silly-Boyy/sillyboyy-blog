import axios from "axios";
import Apikey from "@/utils/PrivateKey.js";

export const getLocationApi = (x, y) => {
  x = x.toFixed(2)
  y = y.toFixed(2)
  return axios.get('https://geoapi.qweather.com/v2/city/lookup', {
    params: {
      location: `${x},${y}`,
      key: Apikey.hefengApiKey
    },
    timeout: 5000
  })
}
