<template>
  <div class="article-detail-structure">
    <div>
      <div class="category-name">카테고리명 {{article.category_no}}</div>
      <div class="item-no">글번호 {{article.no}}</div>
      <div class="item-no">이용자 번호 {{article.user_no}}</div>
    </div>
    <div class="item-info">
      <div class="user-email">이메일 {{article.email}}</div>
      <div class="generated-date">작성일 {{article.updated_at}}</div>
    </div>
    <div class="item-content">
      <div class="title-name">글 제목 {{article.title}}</div>
      <div class="title-content">글 내용 {{article.contents}}</div>
    </div>
    <div>
      댓글
      <div v-if="replies.length === 0">댓글이 없습니다.</div>
      <ul v-else class="list-group">
        <li
          class="list-group-item"
          v-for="(reply, index) in replies"
          v-bind:key="index"
        >
          <Replies v-bind:reply="reply" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import Replies from "./Replies"

export default {
  components: {
    Replies
  },
  name: "ArticleDetail",
  props: ["no"],
  data: () => ({
    article: [],
    replies: []
  }),
  methods: {
    toggleModal () {
      this.isModalOn = !this.isModalOn
    }
  },

  // 컴포넌트 마운트 시 리스트 요청
  mounted () {
    this.$http
      .get(`http://comento.cafe24.com/detail.php/?req_no=${this.no}`)
      .then(response => {
        console.log(response.data.detail)
        this.article = response.data.detail.article
        this.replies = response.data.detail.replies
      })
  }
}
</script>
