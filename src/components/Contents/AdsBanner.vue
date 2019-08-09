<template>
  <div>
    <div class="sponsored-text">Sponsored</div>
    <img v-bind:src="'http://comento.cafe24.com/public/images/'+adsItem.img" />
    <div class="ads-title">{{adsItem.title}}</div>
    <div class="ads-content">{{adsItem.contents}}</div>
  </div>
</template>

<script>
export default {
  props: ["adsItem"]
}
</script>

<style lang="less">
@import '../../styles/style.less';

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
