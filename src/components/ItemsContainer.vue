<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="(item, index) in itemList" v-bind:key="index">
      <div v-if="item.isAd">
        광고 배너 {{item.no}}
        <AdsBanner v-bind:adsItem="item" />
      </div>
      <Items v-else v-bind:item="item" />
    </li>
  </ul>
</template>

<script>
import Items from "./Items"
import AdsBanner from "./Contents/AdsBanner"

export default {
  components: {
    Items,
    AdsBanner
  },
  name: "ItemsContainer",
  props: ["itemList"]
}
</script>

