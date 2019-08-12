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
        <button class="btn btn-primary" @click="toggleModal">필터</button>
      </div>
      <div class="sort-option-area">
        <div
          class="sort-button"
          v-bind:class="{ clicked: sortBtnClicked }"
          @click="switchSortOptionToAsc"
        >오름차순</div>
        <div
          class="sort-button"
          v-bind:class="{ clicked: !sortBtnClicked }"
          @click="switchSortOptionToDesc"
        >내림차순</div>
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
    // 콘텐츠 아이템 리스트
    itemList: [],

    // 모달 토글 여부
    isModalOn: false,

    // 오름차순, 내림차순 초기 번호
    ord: {
      asc: 100,
      desc: 2
    },

    // 선택된 정렵 옵션
    switchedSortOption: "asc",

    // 카테고리 API 응답 객체
    categoryInfo: {},
    // 카테고리 옵션
    categoryLists: {},
    // 필터링을 위한 카테고리 목록
    category: [],

    // 광고 삽입 관련
    adsList: [],
    adsListPage: 1,
    KEY_NUM: 4,
    listLength: 10,
    currentIndex: 3,
    insertedCount: 0,

    // 정렬 버튼 클릭 여부
    sortBtnClicked: true,

    GET_API: {
      contentsList: `http://comento.cafe24.com/request.php/?page=`,
      adsList: `http://comento.cafe24.com/ads.php/?page=`,
      category: `http://comento.cafe24.com/category.php`
    }

  }),
  methods: {
    // X버튼(모달 창 토글)
    toggleModal () {
      this.isModalOn = !this.isModalOn
    },

    // (필터)카테고리 정보 객체 생성
    generateCategoryList () {
      return this.categoryInfo.reduce((acc, v, i) => {
        let obj = {}
        obj.no = v["no"]
        obj.checked = true
        acc[v["name"]] = obj
        return acc
      }, {})
    },

    // 콘텐츠 필터링을 위한 카테고리 배열 생성
    generateCategory () {
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
      this.sortBtnClicked = !this.sortBtnClicked
      this.switchedSortOption = "asc"
      this.requestListAfterSwitchSort((this.ord.asc = 100), this.sortToAsc)
      this.ord.desc = 1
      this.ord.asc--
    },

    // 정렬 옵션 내림차순 전환
    switchSortOptionToDesc () {
      this.sortBtnClicked = !this.sortBtnClicked
      this.switchedSortOption = "desc"
      this.requestListAfterSwitchSort((this.ord.desc = 1))
      this.ord.desc++
      this.ord.asc = 100
    },

    // 저장 버튼 클릭 시 카테고리 조건에 따라 리스트 요청
    requestFilteredList () {
      this.sortBtnClicked = true
      this.switchedSortOption = "asc"
      this.adsList = []
      this.itemList = []
      this.category = this.generateCategory()
      this.requestListAfterSwitchSort((this.ord.asc = 100), this.sortToAsc)
      this.ord.asc--
    },

    // 광고 삽입 로직
    insertAds (sortedList) {
      for (let v of this.adsList) {
        v["isAd"] = true
        sortedList.splice(this.currentIndex, 0, v)
        // console.log(this.currentIndex)
        this.insertedCount++
        this.currentIndex += this.KEY_NUM
        if (this.currentIndex >= this.listLength + 4) {
          // console.log("계산한 숫자: " + this.insertedCount)
          // console.log(this.currentIndex)
          this.currentIndex -= this.listLength + 3
          this.adsList.splice(0, this.insertedCount)
          this.insertedCount = 0
          if (this.currentIndex === 4) {
            this.currentIndex = 3
          }
          // console.log("남은 광고 개수: " + this.adsList.length)
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

      const promiseContentsList = this.$http.get(
        this.GET_API.contentsList + pageNum
      )

      const promiseAdsList = this.$http.get(
        this.GET_API.adsList + this.adsListPage
      )

      Promise.all([promiseContentsList, promiseAdsList]).then(response => {
        // 카테고리 필터링
        const filteredList = this.filterListOnCategory(response[0].data.list)
        this.adsList = response[1].data.list
        if (sortLogic) {
          // 정렬 로직 적용
          const sortedList = sortLogic(filteredList)
          this.composeItemList(sortedList)
        } else {
          this.composeItemList(filteredList)
        }
      })
    },

    composeItemList (list) {
      this.insertAds(list)
      this.itemList = [...list]
      this.adsListPage++
    },

    // 스크롤 시 리스트 요청
    requestListWhenScroll () {
      const scrollHeight = document.documentElement.scrollHeight
      const pageYOffset = window.pageYOffset
      const innerHeight = window.innerHeight

      if (scrollHeight - pageYOffset - innerHeight === 0) {
        const promiseContentsList = this.$http.get(
          this.GET_API.contentsList + `${
            this.switchedSortOption === "asc" ? this.ord.asc : this.ord.desc
          }`
        )

        const promiseAdsList =
          this.adsList.length === 0 ? this.$http.get(this.GET_API.adsList + this.adsListPage)
            : null

        Promise.all([promiseContentsList, promiseAdsList]).then(response => {
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

    const promiseContentsList = this.$http.get(
      this.GET_API.contentsList + this.ord.asc
    )

    const promiseAdsList = this.$http.get(
      this.GET_API.adsList + this.adsListPage
    )

    Promise.all([promiseContentsList, promiseAdsList]).then(response => {
      this.adsList = response[1].data.list
      const sortedList = this.sortToAsc(response[0].data.list)
      this.insertAds(sortedList)
      this.itemList = [...sortedList]
      this.ord.asc--
      this.adsListPage++
    })

    // 카테고리 리스트 요청
    this.$http.get(this.GET_API.category).then(response => {
      this.categoryInfo = response.data.list
      this.categoryLists = this.generateCategoryList()
      this.category = this.generateCategory()
    })
  }
}
</script>

<style lang="less">
@import "../styles/style.less";

.search-menu {
  .flex-default();
  justify-content: space-between;
  margin-bottom: 10px;
}

.dimmed-layer {
  width: 100%;
  height: 100%;
  margin: 0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  background-color: #000;
  opacity: 0.7;
}

.sort-option-area {
  .flex-default();
  justify-content: space-around;
}

.sort-button {
  margin-left: 20px;
  cursor: pointer;
}

.clicked {
  color: red;
}
</style>
