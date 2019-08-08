<template>
  <div>
    <h3>필터</h3>
    <div style="cursor:pointer" @click="handleModalToggle">X</div>
    <div class="category-check">
      <CategoryOption
        v-for="(info, index) in categoryInfo"
        v-bind:key="index"
        v-bind:info="info"
        v-bind:categoryLists="categoryLists"
      />
    </div>
    <button @click="handleSaveClick">저장</button>
  </div>
</template>


<script>
import CategoryOption from "./CategoryOption"

export default {
  props: ["isModalOn", "categoryInfo", "categoryLists"],
  components: {
    CategoryOption
  },
  methods: {
    // 부모 메서드 호출(카테고리 별 GET 요청)
    handleSaveClick () {
      this.$emit("handle-save-click")
      this.handleModalToggle()
    },
    // 부모 메서드 호출(모달 창 토글)
    handleModalToggle () {
      this.$emit("toggle-modal")
      // CSS 속성 설정
    }
  }
}
</script>


