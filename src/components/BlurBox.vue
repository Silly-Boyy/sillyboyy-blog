<script setup>
const size = defineProps({
  width: {
    type: Number,
    default: 200
  },
  height: {
    type: Number,
    default: 200
  }
})
</script>

<template>
  <div class="blur-box"
       :style="{width:`${size.width}px`,height:`${size.height}px`}">
    <slot/>
  </div>
</template>

<style scoped>
.blur-box {
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.3); /* 背景 50% 透明 */
  backdrop-filter: blur(10px); /* 模糊 15px */
  -webkit-backdrop-filter: blur(10px); /* Safari 兼容性 */
}
</style>
