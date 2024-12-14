export const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobileUA = /iphone|ipad|ipod|android|blackberry|webos|windows phone/.test(userAgent);
  const isSmallScreen = window.innerWidth <= 768;

  return isTouchDevice && (isMobileUA || isSmallScreen);
}
