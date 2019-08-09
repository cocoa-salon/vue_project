<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="(item, index) in itemList" v-bind:key="index">
      <div v-if="item.isAd">
        광고 배너 {{item.no}}
        <AdsBanner v-bind:adsItem="item" />
      </div>
      <ArticleItems v-else v-bind:item="item" />
    </li>
  </ul>
</template>

<script>
import ArticleItems from "./ArticleItems"
import AdsBanner from "./AdsBanner"

export default {
  components: {
    ArticleItems,
    AdsBanner
  },
  name: "ContentsContainer",
  props: ["itemList"]
}
</script>

