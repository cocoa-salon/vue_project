<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="(item, index) in itemList" v-bind:key="index">
      <div v-if="item.isAd">
        광고 배너 {{item.no}}
        <img v-bind:src="'http://comento.cafe24.com/public/images/'+item.img" >
      </div>
      <Items v-else v-bind:item="item" />
    </li>
  </ul>
</template>

<script>
import Items from "./Items"

export default {
  components: {
    Items
  },
  name: "ItemsContainer",
  props: ["itemList"]
}
</script>

