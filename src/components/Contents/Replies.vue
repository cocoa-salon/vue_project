<template>
  <div class="reply-detail-structure">
    <div>
      <div class="item-no">글번호 {{reply.no}}</div>
      <div class="item-no">이용자 번호 {{reply.user_no}}</div>
    </div>
    <div class="item-info">
      <div class="user-email">이메일 {{reply.email}}</div>
      <div class="generated-date">작성일 {{reply.updated_at}}</div>
    </div>
    <div class="item-content">
      <div class="title-content">댓글 내용 {{reply.contents}}</div>
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
