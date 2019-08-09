<template>
  <div class="article-detail-structure">
    <div class="article-item-info">
      <span class="user-email">{{article.email}}</span> |
      <span class="generated-date">{{article.updated_at}}</span>
    </div>
    <div class="article-item-content">
      <div class="title-name">{{article.title}}</div>
      <p class="title-content">{{article.contents}}</p>
    </div>
    <div>
      <div v-if="replies.length === 0">댓글이 없습니다.</div>
      <ul v-else class="list-group">
        <span>댓글</span>
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

<style lang="less">
@import '../../styles/style.less';

.article-info {
  .flex-default();
  justify-content: space-between;
}

.article-item-info {
  .text-left-title();
}

.title-name {
  .text-left-title();
}

.article-item-content {
  height: auto;
  text-align: left;
}
</style>
