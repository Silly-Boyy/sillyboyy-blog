<script setup>
const size = defineProps({
  width: {
    type: String,
    default: '200px'
  },
  height: {
    type: String,
    default: '200px'
  },
  hover: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="{hover: size.hover}"
       :style="{width:`${size.width}`,height:`${size.height}`}"
       class="blur-box"
  >
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
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
