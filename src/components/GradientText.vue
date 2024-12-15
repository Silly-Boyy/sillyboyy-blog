<template>
  <component
    :is="props.tag"
    :style="gradientStyle"
    class="gradient-text"
  >
    <slot>默认文字</slot>
  </component>
</template>

<script setup>
import {computed, defineProps} from 'vue';

// Props 接收渐变类型和自定义渐变色
const props = defineProps({
  gradientType: {
    type: String,
    default: 'default', // 支持 'default', 'pinkPurple', 'blueGreen', 'redOrange'，也可以传自定义的
  },
  customColors: {
    type: Array,
    default: () => [] // 自定义渐变色数组
  },
  tag: {
    type: String,
    default: 'p', // 默认使用 span 标签
  },
});

// 预设的渐变色（这里的每个渐变使用了三个颜色）
const gradientPresets = {
  default: 'linear-gradient(100deg, #f953c6, #b91d73, #f12711)',
  pinkPurple: 'linear-gradient(100deg, #ff9a9e, #fad0c4, #fbc2eb)',
  blueGreen: 'linear-gradient(100deg, #00c6ff, #0072ff, #34e89e)',
  redOrange: 'linear-gradient(100deg, #ff7e5f, #feb47b, #ff9966)',
};

const gradientStyle = computed(() => {
  if (props.customColors.length >= 3) {
    // 如果传入了自定义渐变色，则优先使用自定义的
    return {
      backgroundImage: `linear-gradient(90deg, ${props.customColors.join(', ')})`,
    };
  }
  // 否则使用内置的预设渐变
  const gradient = gradientPresets[props.gradientType] || gradientPresets.default;
  return {
    backgroundImage: gradient,
  };
});
</script>

<style scoped>
.gradient-text {
  display: inline-block;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent; /* 透明文字，利用 background-clip 实现文字渐变色 */
}
</style>
