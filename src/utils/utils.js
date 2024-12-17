import {getLocationApi} from "@/apis/location.js";

export const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobileUA = /iphone|ipad|ipod|android|blackberry|webos|windows phone/.test(userAgent);
  const isSmallScreen = window.innerWidth <= 768;

  return isTouchDevice && (isMobileUA || isSmallScreen);
}

export const getTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds
  };
}

function getCurrentPositionAsync(options = {}) {
  return new Promise((resolve, reject) => {
    // 1️⃣ 位置获取的原始 Promise
    const geolocationPromise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    // 2️⃣ 超时的 Promise（5 秒超时）
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('获取位置超时 (Timeout)')), 5000);
    });

    // 3️⃣ 使用 Promise.race 让两个竞争，哪个先返回就取哪个
    Promise.race([geolocationPromise, timeoutPromise])
      .then(resolve) // 成功则返回位置
      .catch(reject); // 失败则返回超时错误
  });
}

export const getPosition = async () => {
  if (navigator.geolocation) {
    try {
      const position = await getCurrentPositionAsync();
      const x = position.coords.longitude;
      const y = position.coords.latitude;
      return await getLocationApi(x, y)
    } catch (err) {
      console.error("获取地理位置失败", err);
      return null;
    }
  } else {
    console.error("浏览器不支持地理定位");
    return null;
  }
}
