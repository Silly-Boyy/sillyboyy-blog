<script setup>
const size = defineProps({
  width: {
    type: Number,
    default: 200
  },
  height: {
    type: Number,
    default: 200
  },
  hover: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="blur-box"
       :style="{width:`${size.width}px`,height:`${size.height}px`}"
       :class="{hover: size.hover}"
  >
    <slot/>
  </div>
</template>

<style scoped lang="scss">
.blur-box {
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.3); /* 背景 50% 透明 */
  backdrop-filter: blur(10px); /* 模糊 15px */
  -webkit-backdrop-filter: blur(10px); /* Safari 兼容性 */
}

.hover {
  transition: all 0.5s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
