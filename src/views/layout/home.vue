<script setup>
</script>

<template>
  <div class="home">
    <t-row :style="{ height: '100vh' }">
      <t-col :sm="6" :xs="12" class="left">
        <div class="content">
          <img src="@/assets/sillyboyy.jpg" alt=""/>
          <h1>This is SillyBoyy</h1>
        </div>
        <div class="loop loop-1"></div>
        <div class="loop loop-2"></div>
        <div class="loop loop-3"></div>
        <div class="loop loop-4"></div>
      </t-col>
      <t-col :sm="3"></t-col>
      <t-col :sm="3"></t-col>
    </t-row>
  </div>
</template>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.home {
  background-image: url('@/assets/bgImg.jpg');
  height: 100vh;
  background-size: cover;

  .left {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .content {
      position: absolute;
      z-index: 999;
      text-align: center;

      h1 {
        font-size: 32px;
        font-family: "Gill Sans", sans-serif;
      }

      img {
        width: 75px;
        height: 75px;
        border-radius: 100%;
        margin-bottom: 20px;
      }
    }

    .loop {
      position: absolute;
      background-color: #fff;
      width: 281px;
      height: 292px;
      border-radius: 31% 43% 27% 33%;
      opacity: 0.4;
    }

    .loop-1 {
      animation: rotate 7.13s linear infinite;
      rotate: 30deg;
    }

    .loop-2 {
      animation: rotate 13.79s linear infinite;
      rotate: 50deg;
    }

    .loop-3 {
      animation: rotate 17.21s linear infinite;
      rotate: 120deg;
    }

    .loop-4 {
      animation: rotate 23.91s linear infinite;
      rotate: 160deg;
    }
  }
}
</style>
