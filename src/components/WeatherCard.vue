<script setup>
import BlurBox from "@/components/BlurBox.vue";
import {computed, defineProps, onMounted, onUnmounted, ref} from "vue";
import {useLocationStore, useWeatherStore} from "@/stores/index.js";
import {isEmpty} from "lodash";
import {Icon} from '@vicons/utils'
import {LocationCityFilled, RestartAltFilled} from '@vicons/material'
import {getTime} from "@/utils/utils.js";
import {FaceIdError} from '@vicons/tabler'

const props = defineProps({
  width: {
    type: String,
    default: '36vw'
  },
  height: {
    type: String,
    default: '200px'
  }
})
// 获取天气
const useWeather = useWeatherStore()
useWeather.fetchWeather()
const hasWeather = computed(() => {
  return !isEmpty(useWeather.weather)
})
// 天气详情
const weatherDetail = ref(false)
// 获取城市
const useLocation = useLocationStore()
const hasLocation = computed(() => {
  return !isEmpty(useLocation.location)
})
useLocation.fetchLocation()
const location = computed(() => {
  const province = useLocation.location.ad_info.province
  const city = useLocation.location.ad_info.city
  const district = useLocation.location.ad_info.district
  if (district) return city + "-" + district
  if (city) return province + "-" + city
  return province
})
// 时间相关
const currentTime = ref('')
const currentDate = ref('')
const updateTime = () => {
  const obj = getTime()
  currentTime.value = `${obj.hours}:${obj.minutes}:${obj.seconds}`
  currentDate.value = `${obj.year}-${obj.month}-${obj.day}`
}
updateTime()
let timer
onMounted(() => {
  timer = setInterval(() => {
    updateTime()
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <BlurBox :height="props.height" :width="props.width" class="weather">
    <n-grid class="content" cols="5" item-responsive>
      <n-gi v-if="hasWeather" class="left" span="0 415:2">
        <i :class="[`qi-${useWeather.weather.icon}-fill`]"
           @mouseenter="weatherDetail = true"
           @mouseleave="weatherDetail = false"
        />
        <p v-show="!weatherDetail">{{ useWeather.weather.text }} ~ {{ useWeather.weather.temp }}℃</p>
        <n-grid v-show="weatherDetail" class="detail" cols="2" y-gap="8">
          <n-gi>体感温度: {{ useWeather.weather.feelsLike }}℃</n-gi>
          <n-gi>相对湿度: {{ useWeather.weather.humidity }}%</n-gi>
          <n-gi>风向: {{ useWeather.weather.windDir }}</n-gi>
          <n-gi>风速: {{ useWeather.weather.windSpeed }}公里/小时</n-gi>
        </n-grid>
      </n-gi>
      <n-gi v-else class="else-left" span="0 415:2">
        <n-flex v-if="useWeather.loading" vertical>
          <p>加载天气^-^</p>
          <n-spin stroke="#fff"/>
        </n-flex>
        <n-flex v-else align="center" vertical>
          <Icon color="#fff" size="75">
            <FaceIdError/>
          </Icon>
          <p>
            天气加载失败
            <Icon size="30" @click="useWeather.fetchWeather()">
              <RestartAltFilled/>
            </Icon>
          </p>
        </n-flex>
      </n-gi>
      <n-gi class="right" span="5 415:3">
        <n-flex v-if="hasLocation" class="city" justify="center">
          <Icon size="30">
            <LocationCityFilled/>
          </Icon>
          <span>{{ location }}</span>
        </n-flex>
        <n-flex v-else-if="useLocation.loading" align="center" class="else-city">
          获取定位中
          <n-spin size="small" stroke="#fff"/>
        </n-flex>
        <n-flex v-else align="center" class="else-city">
          获取定位失败
          <Icon size="24" @click="useLocation.fetchLocation()">
            <RestartAltFilled/>
          </Icon>
        </n-flex>
        <h2 class="time">{{ currentTime }}</h2>
        <h3 class="date">{{ currentDate }}</h3>
      </n-gi>
    </n-grid>
  </BlurBox>
</template>

<style lang="scss" scoped>
.weather {
  display: flex;

  .content {

    .left {

      i {
        margin: 40px auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 75px;
        width: 75px;
        font-size: 75px;
        color: #fff;

        &:hover {
          color: #eee;
          font-size: 70px;
          transition: all 0.2s linear;
        }
      }

      p {
        margin-top: 20px;
        color: #fff;
        font-size: 20px;
        text-align: center;
      }

      .detail {
        margin-top: 20px;
        color: #fff;
        text-align: center;
      }
    }

    .else-left {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: #fff;
        font-size: 20px;
        display: flex;
        align-items: center;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      align-items: center;

      .city {
        margin: 20px 10px;
        width: 100%;
        height: 12%;
        color: #fff;
        font-size: 20px;
      }

      .else-city {
        margin: 20px 10px;
        width: 100%;
        height: 12%;
        color: #fff;
        font-size: 16px;
      }

      .time {
        color: #fff;
        font-size: 65px;
      }

      .date {
        margin: 10px 10px;
        color: #fff;
        font-size: 16px;
      }
    }
  }
}
</style>
