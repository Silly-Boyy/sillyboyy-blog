<script setup>
import BlurBox from "@/components/BlurBox.vue";
import {computed, defineProps, ref} from "vue";
import {useWeatherStore} from "@/stores/index.js";
import {isEmpty} from "lodash";

const props = defineProps({
  width: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 200
  }
})
// 获取天气
const useWeather = useWeatherStore()
useWeather.fetchWeather()
const hasWeather = computed(() => {
  return isEmpty(useWeather.weather)
})
// 天气详情
const weatherDetail = ref(false)
</script>

<template>
  <BlurBox :height="props.height" :width="props.width" class="weather">
    <n-grid class="content" cols="2">
      <n-gi v-if="!hasWeather" class="left" span="1">
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
      <n-gi v-else class="left" span="1">
        <n-flex v-if="useWeather.loading" vertical>
          <p>加载天气^-^</p>
          <n-spin stroke="#fff"/>
        </n-flex>
        <p v-else>天气加载失败</p>
      </n-gi>
      <n-gi class="right" span="1">

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
  }
}
</style>
