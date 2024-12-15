import {defineStore} from "pinia";
import {ref} from "vue";
import {getPosition} from "@/utils/utils.js";

export const useLocationStore = defineStore('sillyboyy-location', () => {

  // 📌 1. 位置数据
  const location = ref({
    adm1: '',
    adm2: '',
    name: '',
    locationId: -1,
  });

  // 📌 2. 加载状态（是否正在加载位置信息）
  const loading = ref(false);

  // 📌 3. 错误信息（如果有错误）
  const error = ref(null);

  // 📌 4. 设置位置的函数
  const setLocation = (adm1, adm2, name, locationId) => {
    location.value.adm1 = adm1;
    location.value.adm2 = adm2;
    location.value.name = name;
    location.value.locationId = locationId;
  };

  // 📌 5. 获取当前位置的函数（集成 getPosition）
  const fetchLocation = async () => {
    loading.value = true; // 开启加载状态
    error.value = null; // 清除上次的错误
    try {
      const {data: {location}} = await getPosition(); // 调用 utils 中的 getPosition 函数
      const position = location?.[0]
      if (position) {
        const {adm1, adm2, name, id} = position;
        setLocation(adm1, adm2, name, id); // 设置位置
      }
    } catch (err) {
      error.value = err; // 如果出错，设置
    }
    loading.value = false; // 关闭加载状态
  };

  return {
    location,
    loading,
    error,
    setLocation,
    fetchLocation, // 📢 暴露 fetchLocation 方法，供外部调用
  };
});
