<template>
  <div class="contentslist-area">
    <FilterModal
      v-if="isModalOn"
      v-on:update-check="updateCheck"
      v-on:toggle-modal="toggleModal"
      v-on:save-option="getSearch"
      v-bind:isCategoryChecked="isCategoryChecked"
      v-bind:isModalOn="isModalOn"
    />
    <div class="nav-tool">
      <button class="btn btn-info" @click="toggleModal">필터</button>
      <button class="btn btn-primary">오름차순</button>
      <button class="btn btn-danger">내림차순</button>
    </div>
    <div class="items-section">
      <ItemsContainer v-bind:itemList="itemList" />
    </div>
  </div>
</template>


<script>
import ItemsContainer from "./ItemsContainer"
import FilterModal from "./FilterModal"

export default {
  components: {
    ItemsContainer,
    FilterModal
  },
  data: () => ({
    itemList: [],
    isModalOn: false,
    isCategoryChecked: {
      category1: true,
      category2: true,
      category3: true
    }
  }),
  methods: {
    // X버튼 : 모달 창 토글
    toggleModal () {
      this.isModalOn = !this.isModalOn
    },
    // 카테고리 체크 상태 업데이트
    updateCheck (checked, boxName) {
      this.isCategoryChecked = {
        ...this.isCategoryChecked,
        [boxName]: checked
      }
      console.log(this.isCategoryChecked)
    },
    getSearch () {
      console.log("API 요청")
    }
  },
  // 컴포넌트 마운트 시 글 리스트 10개 GET 요청
  mounted () {
    console.log("Component mounted.")
    this.$http
      .get("http://comento.cafe24.com/request.php/?page=1")
      .then(response => {
        this.itemList = [...response.data.list]
        console.log(this.itemList)
      })
  }
}
</script>
