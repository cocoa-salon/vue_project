<template>
  <div class="filter-modal">
    <div class="filter-text">
      <div>필터</div>
      <div style="cursor:pointer" @click="handleModalToggle">X</div>
    </div>
    <div class="category-check">
      <FilterOptions
        v-for="(info, index) in categoryInfo"
        v-bind:key="index"
        v-bind:info="info"
        v-bind:categoryLists="categoryLists"
      />
    </div>
    <div class="save-button-area">
      <button @click="handleSaveClick" class="save-btn btn btn-primary">저장</button>
    </div>
  </div>
</template>


<script>
import FilterOptions from "./FilterOptions"

export default {
  props: ["isModalOn", "categoryInfo", "categoryLists"],
  components: {
    FilterOptions
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
    }
  }
}
</script>

<style lang="less">
@import "../../styles/style.less";

.filter-modal {
  width: 360px;
  height: 150px;
  position: fixed;
  left: 50%;
  top: 25%;
  margin-left: -180px;
  z-index: 10;
  background: white;
  border-radius: 4px;
}

.filter-text {
  padding: 15px 20px 20px 20px;
  font-size: 18px;
  font-weight: bold;
  .flex-default();
  justify-content: space-between;
}

.category-check {
  .flex-default();
  justify-content: space-around;
}

.save-button-area {
  padding: 20px 20px 0 0;
  .flex-default();
  justify-content: flex-end;
}

.save-btn {
  display: block;
}
</style>
