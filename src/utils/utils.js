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
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}

function getCurrentPositionAsync(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export const getPosition = async () => {
  if (navigator.geolocation) {
    const position = await getCurrentPositionAsync();
    const x = position.coords.longitude;
    const y = position.coords.latitude;
    return await getLocationApi(x, y)
  } else {
    console.error("浏览器不支持地理定位");
  }
}
