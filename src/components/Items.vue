<template>
  <div class="item-structure">
    <div>
      <div class="category-name">카테고리명 {{contentList[0].category}}</div>
      <div class="item-no">글번호 {{contentList[0].itemNo}}</div>
    </div>
    <div class="item-info">
      <div class="user-email">이메일 {{contentList[0].userEmail}}</div>
      <div class="generated-date">작성일 {{contentList[0].generatedDate}}</div>
    </div>
    <div class="item-content">
      <div class="title-name">글 제목 {{contentList[0].titleName}}</div>
      <div class="title-content">글 내용 {{contentList[0].titleContent}}</div>
    </div>
    {{name}}
  </div>
</template>

<script>
export default {
  name: "Items",
  props: ["contentList", "name"],
  data: function () {
    return {
      greeting: "hahaha"
    }
  }
}
</script>


