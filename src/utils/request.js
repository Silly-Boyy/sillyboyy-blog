import axios from "axios";

const baseURL = "http://localhost:8080";

const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)


export default instance;
