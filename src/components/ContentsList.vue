<template>
  <div class="contentslist-area">
    <FilterModal
      v-if="isModalOn"
      v-on:update-check="updateCheck"
      v-on:toggle-modal="toggleModal"
      v-on:save-option="filterListOnCategory"
      v-bind:isCategoryChecked="isCategoryChecked"
      v-bind:isModalOn="isModalOn"
    />
    <div class="nav-tool">
      <button class="btn btn-info" @click="toggleModal">필터</button>
      <button class="btn btn-primary" @click="switchSortOptionToAsc">오름차순</button>
      <button class="btn btn-danger" @click="switchSortOptionToDesc">내림차순</button>
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
    ord: {
      asc: 100,
      desc: 2
    },

    switchedSortOption: "desc",
    isCategoryChecked: {
      category1: true,
      category2: true,
      category3: true
    },

    categoryExample: {
      category1: "1",
      category2: "2",
      category3: "3"
    },

    category: ["1", "2", "3"]

  }),
  methods: {
    // X버튼 : 모달 창 토글
    toggleModal () {
      this.isModalOn = !this.isModalOn
    },

    // 카테고리 체크 상태 업데이트
    updateCheck (boxName, checked) {
      this.isCategoryChecked = {
        ...this.isCategoryChecked,
        [boxName]: checked
      }
      this.updateCategory(boxName, checked)
    },

    // 체크 상태에 따라 필터 카테고리 옵션 업데이트
    updateCategory (boxName, checked) {
      if (this.isCategoryChecked[boxName] === true) {
        this.category.push(this.categoryExample[boxName])
      } else {
        this.category = this.category.filter((v, i) => {
          return v !== this.categoryExample[boxName]
        })
      }
    },

    // 오름차순 정렬
    sortToAsc (arr) {
      return arr.sort((a, b) => Number(a.no) - Number(b.no))
    },

    // 정렬 옵션 오름차순 전환
    switchSortOptionToAsc () {
      this.switchedSortOption = "asc"
      this.requestListAfterSwitchSort((this.ord.asc = 100), this.sortToAsc)
      this.ord.asc--
      // 응답 데이터 배열 내부에서 다시 오름차순으로 정렬해야 한다.
    },

    // 정렬 옵션 내림차순 전환
    switchSortOptionToDesc () {
      this.switchedSortOption = "desc"
      this.requestListAfterSwitchSort((this.ord.desc = 1))
      this.ord.desc++
    },

    filterListOnCategory () {
      console.log("hello!")
    },

    // 정렬 옵션 전환 후 초기 리스트 요청
    requestListAfterSwitchSort (pageNum, sortLogic) {
      this.itemList = []
      this.$http
        .get(`http://comento.cafe24.com/request.php/?page=${pageNum}`)
        .then(response => {
          // 카테고리 필터링
          if (sortLogic) {
            const sortedList = sortLogic(response.data.list)
            this.itemList = [...sortedList]
          } else this.itemList = [...response.data.list]
        })
    },

    // 스크롤링 시 리스트 요청
    requestListWhenScroll () {
      const scrollHeight = document.documentElement.scrollHeight
      const pageYOffset = window.pageYOffset
      const innerHeight = window.innerHeight

      if (scrollHeight - pageYOffset - innerHeight === 0) {
        this.$http
          .get(
            `http://comento.cafe24.com/request.php/?page=${
              this.switchedSortOption === "asc" ? this.ord.asc : this.ord.desc
            }`
          )
          .then(response => {
            // 카테고리 필터링
            if (this.switchedSortOption === "asc") {
              const sortedList = this.sortToAsc(response.data.list)
              this.itemList = [...this.itemList, ...sortedList]
            } else this.itemList = [...this.itemList, ...response.data.list]
            if (this.switchedSortOption === "asc") this.ord.asc--
            else this.ord.desc++
          })
      }
    }
  },
  // 컴포넌트 마운트 시 리스트 요청
  mounted () {
    console.log("Component mounted.")
    this.$http
      .get(`http://comento.cafe24.com/request.php/?page=${this.ord.desc - 1}`)
      .then(response => {
        this.itemList = [...response.data.list]
      })
    window.addEventListener("scroll", this.requestListWhenScroll)
  }
}
</script>
