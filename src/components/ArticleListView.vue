<template>
  <div class="articleList-view-area">
    <FilterModal
      v-if="isModalOn"
      v-on:toggle-modal="toggleModal"
      v-on:handle-save-click="requestFilteredList"
      v-bind:isModalOn="isModalOn"
      v-bind:categoryInfo="categoryInfo"
      v-bind:categoryLists="categoryLists"
    />
    <div v-if="isModalOn" class="dimmed-layer" />
      <div class="search-menu">
        <div class="filter-area">
          <button class="btn btn-info" @click="toggleModal">필터</button>
        </div>
        <div class="sort-option-area">
          <button class="btn btn-primary" @click="switchSortOptionToAsc">오름차순</button>
          <button class="btn btn-danger" @click="switchSortOptionToDesc">내림차순</button>
        </div>
      </div>
      <div class="items-section">
        <ContentsContainer v-bind:itemList="itemList" v-bind:adsList="adsList" />
      </div>
  </div>
</template>


<script>
import ContentsContainer from "./Contents/ContentsContainer"
import FilterModal from "./FilterModal/FilterModal"

export default {
  components: {
    ContentsContainer,
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
    categoryLists: {},
    adsList: [],
    adsListPage: 1,
    standardNum: 4,
    listLength: 10,
    currentIndex: 3,
    count: 0
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
      this.adsList = []
      this.itemList = []
      this.category = this.makeCategory()
      this.requestListAfterSwitchSort((this.ord.desc = 1))
      this.ord.desc++
    },

    // 광고 삽입 로직
    insertAds (sortedList) {
      for (let v of this.adsList) {
        v["isAd"] = true
        sortedList.splice(this.currentIndex, 0, v)
        this.count++
        this.currentIndex += this.standardNum
        if (this.currentIndex >= this.listLength + 3) {
          this.currentIndex -= this.listLength + 3
          this.adsList.splice(0, this.count)
          this.count = 0
          return
        }
      }
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
      this.currentIndex = 3
      this.adsListPage = 1
      const promise1 = this.$http.get(
        `http://comento.cafe24.com/request.php/?page=${pageNum}`
      )

      const promise2 = this.$http.get(
        `http://comento.cafe24.com/ads.php/?page=${this.adsListPage}`
      )

      Promise.all([promise1, promise2]).then(response => {
        // 카테고리 필터링
        const filteredList = this.filterListOnCategory(response[0].data.list)
        // console.log(filteredList)
        this.adsList = response[1].data.list
        if (sortLogic) {
          // 정렬 로직 적용
          const sortedList = sortLogic(filteredList)
          // 광고 삽입 로직
          this.insertAds(sortedList)
          this.itemList = [...sortedList]
          this.adsListPage++
        } else {
          // 광고 삽입 로직
          this.insertAds(filteredList)
          this.itemList = [...filteredList]
          this.adsListPage++
        }
      })
    },

    // 스크롤링 시 리스트 요청
    requestListWhenScroll () {
      const scrollHeight = document.documentElement.scrollHeight
      const pageYOffset = window.pageYOffset
      const innerHeight = window.innerHeight

      if (scrollHeight - pageYOffset - innerHeight === 0) {
        const promise1 = this.$http.get(
          `http://comento.cafe24.com/request.php/?page=${
            this.switchedSortOption === "asc" ? this.ord.asc : this.ord.desc
          }`
        )

        const promise2 =
          this.adsList.length < 5
            ? this.$http.get(
              `http://comento.cafe24.com/ads.php/?page=${this.adsListPage}`
            )
            : null

        Promise.all([promise1, promise2]).then(response => {
          // 카테고리 필터링
          const filteredList = this.filterListOnCategory(response[0].data.list)
          if (this.switchedSortOption === "asc") {
            const sortedList = this.sortToAsc(filteredList)
            // 광고 삽입 로직
            if (response[1]) {
              this.adsList = [...this.adsList, ...response[1].data.list]
              this.adsListPage++
            }
            this.insertAds(sortedList)
            this.itemList = [...this.itemList, ...sortedList]
          } else {
            // 광고 삽입 로직
            if (response[1]) {
              this.adsList = [...this.adsList, ...response[1].data.list]
              this.adsListPage++
            }
            this.insertAds(filteredList)
            this.itemList = [...this.itemList, ...filteredList]
          }
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

    const promise1 = this.$http.get(
      `http://comento.cafe24.com/request.php/?page=${this.ord.desc - 1}`
    )

    const promise2 = this.$http.get(
      `http://comento.cafe24.com/ads.php/?page=${this.adsListPage}`
    )

    Promise.all([promise1, promise2]).then(response => {
      this.adsList = response[1].data.list
      this.insertAds(response[0].data.list)
      this.itemList = [...response[0].data.list]
      this.adsListPage++
    })

    this.$http.get(`http://comento.cafe24.com/category.php`).then(response => {
      this.categoryInfo = response.data.list
      this.categoryLists = this.makeCategoryList()
      this.category = this.makeCategory()
    })
  }
}
</script>

<style lang="less">
@import "../styles/style.less";

.search-menu {
  .flex-default();
  justify-content: space-between;
}

.dimmed-layer {
  width: 100%;
  height: 100%;
  margin: 0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  background-color:#000;
  opacity: 0.7;
}
</style>
