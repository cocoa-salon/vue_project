<template>
  <div>
    <div>hello world</div>
    <span>{{no}}</span>
  </div>
</template>


<script>
export default {
  name: "ListDetail",
  props: ["no"],
  data: () => ({
    article: []
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
        console.log(response.data.detail.article)
        this.article = response.data.detail.article
      })
  }
}
</script>
