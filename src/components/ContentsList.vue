<template>
  <div class="contentslist-area">
    <FilterModal
      v-if="isModalOn"
      v-on:toggle-modal="toggleModal"
      v-on:handle-save-click="requestFilteredList"
      v-bind:isModalOn="isModalOn"
      v-bind:categoryInfo="categoryInfo"
      v-bind:categoryLists="categoryLists"
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
    categoryInfo: {},
    category: [],
    categoryLists: {}
  }),
  methods: {
    // X버튼 : 모달 창 토글
    toggleModal () {
      this.isModalOn = !this.isModalOn
    },

    makeCategoryList () {
      return this.categoryInfo.reduce((acc, v, i) => {
        let obj = {}
        obj.no = v["no"]
        obj.checked = true
        acc[v["name"]] = obj
        return acc
      }, {})
    },

    makeCategory () {
      let arr = Object.keys(this.categoryLists)
      return arr.filter((v, i) => {
        if (this.categoryLists[v]["checked"]) {
          return v
        }
      })
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

    // 저장 버튼 클릭 시 카테고리 조건에 따라 리스트 요청
    requestFilteredList () {
      this.category = this.makeCategory()
      this.requestListAfterSwitchSort((this.ord.desc = 1))
      this.ord.desc++
    },

    // 카테고리 옵션에 따라 리스트 필터링
    filterListOnCategory (responseArr) {
      const filteredList = []
      responseArr.forEach(v => {
        this.category.forEach(v2 => {
          if (this.categoryLists[v2]["no"] === v["category_no"]) {
            filteredList.push(v)
          }
        })
      })
      return filteredList
    },

    // 정렬 옵션 전환 후 초기 리스트 요청
    requestListAfterSwitchSort (pageNum, sortLogic) {
      this.itemList = []
      this.$http
        .get(`http://comento.cafe24.com/request.php/?page=${pageNum}`)
        .then(response => {
          // 카테고리 필터링
          const filteredList = this.filterListOnCategory(response.data.list)
          if (sortLogic) {
            const sortedList = sortLogic(filteredList)
            this.itemList = [...sortedList]
          } else this.itemList = [...filteredList]
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
            const filteredList = this.filterListOnCategory(response.data.list)
            if (this.switchedSortOption === "asc") {
              const sortedList = this.sortToAsc(filteredList)
              this.itemList = [...this.itemList, ...sortedList]
            } else this.itemList = [...this.itemList, ...filteredList]
            if (this.switchedSortOption === "asc") this.ord.asc--
            else this.ord.desc++
          })
      }
    }
  },

  // 컴포넌트 마운트 시 리스트 요청
  mounted () {
    console.log("Component mounted.")
    window.addEventListener("scroll", this.requestListWhenScroll)
    this.$http
      .get(`http://comento.cafe24.com/request.php/?page=${this.ord.desc - 1}`)
      .then(response => {
        this.itemList = [...response.data.list]
      })
    this.$http.get(`http://comento.cafe24.com/category.php`).then(response => {
      console.log(response)
      this.categoryInfo = response.data.list
      this.categoryLists = this.makeCategoryList()
      this.category = this.makeCategory()
    })
  }
}
</script>
