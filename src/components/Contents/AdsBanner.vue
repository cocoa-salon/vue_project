<template>
  <div class="ads-area">
    <div class="sponsored-text">Sponsored</div>
    <div class="ads-box">
      <div class="ads-image">
        <img v-bind:src="'http://comento.cafe24.com/public/images/'+adsItem.img" />
      </div>
      <div class=ads-info>
        <div class="ads-title">{{adsItem.title}}</div>
        <div class="ads-content">{{adsItem.contents}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["adsItem"]
}
</script>

<style lang="less">
@import "../../styles/style.less";

.ads-title {
  .text-left-title();
}

.ads-content {
  height: 20px;
  .text-overflow();
}

.sponsored-text {
  .text-left-title();
}

img {
  .ads-img();
}
</style>
