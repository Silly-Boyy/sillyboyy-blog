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
