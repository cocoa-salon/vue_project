<template>
  <div class="item-structure">
    <div>
      <div class="category-name">카테고리명 {{item.category_no}}</div>
      <div class="item-no">글번호 {{item.no}}</div>
    </div>
    <div class="item-info">
      <div class="user-email">이메일 {{item.email}}</div>
      <div class="generated-date">작성일 {{item.updated_at}}</div>
    </div>
    <div class="item-content">
      <div class="title-name">글 제목 {{item.title}}</div>
      <div class="title-content">글 내용 {{item.contents}}</div>
    </div>
    <router-link :to="{ name: 'ListDetail', params: { no: item.no }}">내용 보기</router-link>
  </div>
</template>

<script>

export default {
  name: "Items",
  props: ["item"]
}
</script>


