import {createPinia} from "pinia";

const pinia = createPinia()

export * from './modules/contact.js'
export * from './modules/location.js'
export * from './modules/weather.js'

export default pinia
