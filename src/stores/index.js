import {createPinia} from "pinia";
import persist from 'pinia-plugin-persistedstate';

const pinia = createPinia()
pinia.use(persist)

export * from './modules/contact.js'
export * from './modules/location.js'
export * from './modules/weather.js'

export default pinia
