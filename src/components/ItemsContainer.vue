<template>
  <ul class="list-group">
    <li class="list-group-item">
      <Items v-bind:contentList="contentList" v-bind:name="name" />
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
  props: ["myNum"],
  data: function () {
    return {
    //   nick: "hobbit",
      name: 'lee',
      contentList: [
        {
          category: "질문",
          itemNo: 4,
          userEmail: "marcie179c@gmail.com",
          generatedDate: "2019-08-06",
          titleName: "금요일까지 가능한가요.",
          titleContent: "초조해 하지 말고 최선만 다하자."
        }
      ]
    }
  }
}
</script>

