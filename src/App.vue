<script setup>
import {RouterView} from 'vue-router'
import {onMounted} from 'vue'
import {getLocationApi} from "@/apis/location.js";
import {useEventListener} from "@vueuse/core";
// 鼠标样式
onMounted(() => {
  const mouse1 = document.querySelector('.mouse-1')
  const mouse2 = document.querySelector('.mouse-2')

  let X = 0, Y = 0 // 鼠标位置
  let targetX = 0, targetY = 0  // mouse2 目标位置
  let currentX = 0, currentY = 0 // mouse2 的当前位置

  useEventListener('mousemove', (e) => {
    X = e.clientX - mouse1.offsetWidth / 2
    Y = e.clientY - mouse1.offsetHeight / 2
    targetX = e.clientX - mouse2.offsetWidth / 2
    targetY = e.clientY - mouse2.offsetHeight / 2
    mouse1.style.transform = `translate(${X}px, ${Y}px)`
  })

  useEventListener(document, 'mouseleave', () => {
    mouse1.style.opacity = 0
    mouse2.style.opacity = 0
  })

  useEventListener(document, 'mouseenter', () => {
    mouse1.style.opacity = 1
    mouse2.style.opacity = 1
  })

  function animate() {
    // 缓动系数，越接近1越慢，0.1-0.2 比较合适
    const easing = 0.2

    // 让当前位置趋近于目标位置
    currentX += (targetX - currentX) * easing
    currentY += (targetY - currentY) * easing

    // 使用 transform 代替 left 和 top，性能更高
    mouse2.style.transform = `translate(${currentX}px, ${currentY}px)`

    requestAnimationFrame(animate) // 保持循环调用
  }

  animate() // 启动动画循环
})
// 获取位置
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude; // 纬度
      const longitude = position.coords.longitude; // 经度
      console.log(`纬度: ${latitude}, 经度: ${longitude}`);
      getLocationApi(longitude, latitude).then(res => {
        console.log(res)
      })
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("用户拒绝访问地理位置");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("位置信息不可用");
          break;
        case error.TIMEOUT:
          console.error("请求超时");
          break;
        default:
          console.error("未知错误");
          break;
      }
    }
  );
} else {
  console.error("浏览器不支持地理定位");
}
</script>

<template>
  <div>
    <div class="mouse-1"></div>
    <div class="mouse-2"></div>
    <RouterView/>
  </div>
</template>

<style>
* {
  cursor: none;
  font-family: "Gill Sans", sans-serif;
}

.mouse-1 {
  height: 10px;
  width: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  z-index: 9999;
  border-radius: 100%;
  pointer-events: none;
  transform: translate(-200px, 0);
}

.mouse-2 {
  height: 20px;
  width: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 9998;
  border-radius: 100%;
  pointer-events: none;
  transform: translate(-200px, 0);
}
</style>
