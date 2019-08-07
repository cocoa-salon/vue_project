<template>
  <div class="contentslist-area">
    <FilterModal v-if="isModalOn" />
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
    isModalOn: false
  }),
  methods: {
    toggleModal () {
      console.log(`isModalOn : ${this.isModalOn}`)
      this.isModalOn = !this.isModalOn
    }
  },
  mounted () {
    console.log("Component mounted.")
  }
}
</script>
