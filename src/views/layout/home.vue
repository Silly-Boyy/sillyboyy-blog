<script setup>
import BlurBox from "@/components/BlurBox.vue";
import {ref} from "vue";
import {useContactStore} from "@/stores/index.js";
import GradientText from "@/components/GradientText.vue";
import {GithubOutlined, QqOutlined} from '@vicons/antd'
import {LogoTiktok} from '@vicons/ionicons5'
import {Icon} from '@vicons/utils'
import WeatherCard from "@/components/WeatherCard.vue";
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
//contact 文字部分
const useContact = useContactStore()
const contactText = ref('')
const setText = (text) => {
  contactText.value = text
}
</script>

<template>
  <div class="home">
    <n-grid cols="2" item-responsive>
      <n-gi class="left" span="2 768:1">
        <div class="nav"></div>
        <div class="content">
          <img alt="" src="@/assets/sillyboyy.jpg"/>
          <h1>
            <GradientText tag="h1">This is SillyBoyy</GradientText>
          </h1>
        </div>
        <div class="loop loop-1"></div>
        <div class="loop loop-2"></div>
        <div class="loop loop-3"></div>
        <div class="loop loop-4"></div>
        <div class="loop loop-5"></div>
        <BlurBox class="contact" height='100px' width='300px'>
          <div class="icon">
            <Icon
              v-for="item in icons"
              :key="item.name" :class="['icon-item', item.name]"
              color="#fff"
              tag="a"
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
      <n-gi class="right" span="0 768:1">
        <WeatherCard/>
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
        font-size: 24px;
        font-weight: bold;
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
    display: flex;
    justify-content: center;

    .weather {
      margin-top: 100px;
    }
  }
}
</style>
