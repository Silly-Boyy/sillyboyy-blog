<script setup>
import BlurBox from "@/components/BlurBox.vue";
import {ref, onMounted, onUnmounted} from "vue";
import {useContactStore, useLocationStore} from "@/stores/index.js";
import GradientText from "@/components/GradientText.vue";
import {getPosition, getTime} from "@/utils/utils.js";
import {QqOutlined, GithubOutlined} from '@vicons/antd'
import {LogoTiktok} from '@vicons/ionicons5'
import {Icon} from '@vicons/utils'
//图标相关
const icons = [
  {
    name: 'qq',
    icon: QqOutlined
  },
  {
    name: 'github',
    icon: GithubOutlined
  },
  {
    name: 'tiktok',
    icon: LogoTiktok
  }
]
const iconSize = ref(24)
//contact 文字部分
const useContact = useContactStore()
const contactText = ref('')
const setText = (text) => {
  contactText.value = text
}
// 获取定位
const useLocation = useLocationStore()
onMounted(async () => {
  const {data: {location}} = await getPosition();
  const adm1 = location?.[0].adm1
  const adm2 = location?.[0].adm2
  const name = location?.[0].name
  useLocation.setLocation(adm1, adm2, name)
})
// 时间相关
const currentTime = ref('')
let timer
onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = getTime()
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="home">
    <n-grid item-responsive cols="2">
      <n-gi span="2 768:1" class="left">
        <div class="nav"></div>
        <div class="content">
          <img src="@/assets/sillyboyy.jpg" alt=""/>
          <h1>
            <GradientText>This is SillyBoyy</GradientText>
          </h1>
        </div>
        <div class="loop loop-1"></div>
        <div class="loop loop-2"></div>
        <div class="loop loop-3"></div>
        <div class="loop loop-4"></div>
        <div class="loop loop-5"></div>
        <BlurBox class="contact" :width=300 :height=100>
          <div class="icon">
            <Icon
              :class="['icon-item', item.name]"
              tag="a" color="#fff"
              v-for="item in icons"
              :key="item.name"
            >
              <component
                :is="item.icon"
                @mouseenter="setText(useContact.contact_text[item.name])"
                @mouseleave="setText('')"
              />
            </Icon>
          </div>
          <div class="text">
            <!--TODO 后续添加随机名句接口-->
            <p :style="{fontSize:'20px'}">"{{ contactText || '正在施工🚧...' }}"</p>
          </div>
        </BlurBox>
      </n-gi>
      <n-gi span="0 768:1" class="right">
        <BlurBox :width=500 :height=200 class="weather">
          {{ useLocation.location.adm1 }}
          {{ useLocation.location.adm2 }}
          {{ useLocation.location.name }}
        </BlurBox>

      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
@keyframes rotate {
  0% {
    transform: translateY(-50px) rotate(0deg);
  }
  100% {
    transform: translateY(-50px) rotate(360deg);
  }
}

.home {
  background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.4)), url('@/assets/bgImg.jpg');
  background-size: cover;
  height: 100svh;
  min-height: 650px;

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    .contact {
      margin-top: 500px;
      padding: 10px;

      .text {
        color: #fff;
        width: 100%;
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
          font-size: 20px;
        }
      }

      .icon {
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon-item {
          width: 30px;
          height: 30px;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            font-size: 30px;
            transition: font-size 0.2s linear;
          }
        }

      }
    }

    .content {
      position: absolute;
      z-index: 999;
      text-align: center;
      transform: translateY(-50px);

      h1 {
        font-size: 32px;
      }

      img {
        width: 75px;
        height: 75px;
        border-radius: 100%;
        margin-bottom: 20px;
      }
    }

    .loop {
      position: absolute;

      background-color: #fff;
      width: 281px;
      height: 292px;
      opacity: 0.35;
    }

    .loop-1 {
      border-radius: 58% 44% 32% 38%;
      animation: rotate 13s linear infinite;
    }

    .loop-2 {
      border-radius: 32% 57% 36% 38%;
      animation: rotate 15s linear infinite;
    }

    .loop-3 {
      border-radius: 25% 34% 52% 48%;
      animation: rotate 17s linear infinite;
    }

    .loop-4 {
      border-radius: 28% 32% 35% 59%;
      animation: rotate 19s linear infinite;
    }

    .loop-5 {
      border-radius: 38% 22% 35% 29%;
      animation: rotate 27.91s linear infinite;
    }
  }

  .right {
    background-color: pink;
    display: flex;
    justify-content: center;
    height: 300px;
    align-items: center;
  }
}
</style>
