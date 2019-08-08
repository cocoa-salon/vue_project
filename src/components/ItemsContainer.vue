<template>
  <ul class="list-group">
    <li class="list-group-item"
        v-for="(item, index) in itemList"
        v-bind:key="index">
      <Items
        v-bind:item="item"
      />
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

