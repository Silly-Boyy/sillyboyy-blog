import {defineStore} from "pinia";
import {ref} from "vue";
import {getLocationApi} from "@/apis/location.js";

export const useLocationStore = defineStore('sillyboyy-location', () => {

  // 📌 1. 位置数据
  const location = ref(null);

  // 📌 2. 加载状态（是否正在加载位置信息）
  const loading = ref(false);

  // 📌 3. 错误信息（如果有错误）
  const error = ref(null);

  // 📌 5. 获取当前位置的函数（集成 getPosition）
  const fetchLocation = async () => {
    //if (location.value && new Date().getTime() - location.value.time < 1000 * 60) return;
    loading.value = true; // 开启加载状态
    error.value = null; // 清除上次的错误
    try {
      const data = await getLocationApi();
      location.value = data.data?.result
      location.value.time = new Date().getTime()
    } catch (err) {
      error.value = err; // 如果出错，设置
    }
    loading.value = false; // 关闭加载状态
  };

  return {
    location,
    loading,
    error,
    fetchLocation, // 📢 暴露 fetchLocation 方法，供外部调用
  };
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['location'],
      }
    ]
  }
});
