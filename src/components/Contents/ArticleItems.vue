<template>
  <div class="item-structure">
    <div class="category-info">
      <div class="category-name">카테고리명 {{item.category_no}}</div>
      <div class="item-no">글번호 {{item.no}}</div>
    </div>
    <div class="content-box">
      <div class="item-info">
        <span class="user-email">{{item.email}}</span> |
        <span class="generated-date">{{item.updated_at}}</span>
      </div>
      <div class="item-content">
        <div class="title-name">{{item.title}}</div>
        <p class="title-content">{{item.contents}}</p>
      </div>
    </div>
    <router-link :to="{ name: 'ArticleDetail', params: { no: item.no }}">더보기</router-link>
  </div>
</template>

<script>
export default {
  name: "Items",
  props: ["item"]
}
</script>

<style lang="less">
@import '../../styles/style.less';

.category-info {
  .flex-default();
  justify-content: space-between;
}

.item-info {
  .text-left-title();
}

.item-content {
  height: 40px;
}

.title-name {
  .text-left-title();
}

.title-content {
 .text-overflow();
}
</style>
