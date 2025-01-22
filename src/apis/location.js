import axios from "axios";
import Apikey from "../../public/PrivateKey.js";

export const getLocationApi = () => {
  return axios.get('/map-api/ws/location/v1/ip', {
    params: {
      key: Apikey.tencentApiKey
    }
  })
}
