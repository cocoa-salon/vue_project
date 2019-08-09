<template>
  <div>
    <img v-bind:src="'http://comento.cafe24.com/public/images/'+adsItem.img" />
    <div>{{adsItem.title}}</div>
    <div>{{adsItem.contents}}</div>
  </div>
</template>

<script>
export default {
  props: ["adsItem"]
}
</script>
