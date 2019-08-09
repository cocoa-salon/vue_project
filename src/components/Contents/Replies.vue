<template>
  <div class="reply-detail-structure">
    <div class="reply-item-info">
      <span class="user-email">{{reply.email}}</span> |
      <span class="generated-date">{{reply.updated_at}}</span>
    </div>
    <div class="reply-item-content">
      <p class="title-content">{{reply.contents}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Replies",
  props: ["reply"],
  data: () => ({
    replies: []
  })
}
</script>

<style lang="less">
@import '../../styles/style.less';

.reply-item-info {
  .text-left-title();
}

.reply-item-content {
  text-align: left;
  height: auto;
}
</style>
