<template>
  <div class="contentslist-area">
    <FilterModal v-on:update-check="updateCheck" v-if="isModalOn" v-bind:isCategoryChecked="isCategoryChecked" />
    <div class="nav-tool">
      <button class="btn btn-info" @click="toggleModal">필터</button>
      <button class="btn btn-primary">오름차순</button>
      <button class="btn btn-danger">내림차순</button>
    </div>
    <div class="items-section">
      <ItemsContainer v-bind:myNum="myNum" />
    </div>
  </div>
</template>


<script>
import ItemsContainer from "./ItemsContainer"
import FilterModal from './FilterModal'

export default {
  components: {
    ItemsContainer,
    FilterModal
  },
  name: "ContentsList",
  data: () => ({
    myNum: 12345,
    isModalOn: false,
    isCategoryChecked: {
      category1: true,
      category2: true,
      category3: true
    }
  }),
  methods: {
    toggleModal () {
      console.log(`isModalOn : ${this.isModalOn}`)
      this.isModalOn = !this.isModalOn
    },
    updateCheck (checked, boxName) {
      this.isCategoryChecked = { ...this.isCategoryChecked, [boxName]: checked }
      // console.log(checked)
      // console.log(boxName)
      console.log(this.isCategoryChecked)
    }
  },
  mounted () {
    console.log("Component mounted.")
  }
}
</script>
