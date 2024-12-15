<script setup>
import {RouterView} from 'vue-router'
import {onMounted} from 'vue'
import {getLocationApi} from "@/apis/location.js";
import {useEventListener} from "@vueuse/core";
import {useLocationStore} from "@/stores/index.js";
import {isMobile} from "@/utils/utils.js";
// 鼠标样式
onMounted(() => {
  if (isMobile()) return
  const mouse1 = document.querySelector('.mouse-1')
  const mouse2 = document.querySelector('.mouse-2')

  let X = -100, Y = -100 // 鼠标位置
  let targetX = -100, targetY = -100  // mouse2 目标位置
  let currentX = -100, currentY = -100 // mouse2 的当前位置

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
