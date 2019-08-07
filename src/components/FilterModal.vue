<template>
  <div>
    <h3>필터</h3>
    <div>X</div>
    <div class="category-check" @click="handleCheck">
      <input type="checkbox" checked="checked" name="category1" value="category1" />카테고리1
      <input type="checkbox" checked="checked" name="category2" value="category2" />카테고리2
      <input type="checkbox" checked="checked" name="category3" value="category3" />카테고리3
    </div>
    <button @click="saveOption">저장</button>
  </div>
</template>


<script>
export default {
  props: ["isCategoryChecked"],
  methods: {
    saveOption () {
      console.log("저장")
    },
    handleCheck (e) {
      const checked = e.target.checked
      const boxName = e.target.name
      //   console.log(this.isCategoryChecked)
      console.log(checked)
      console.log(boxName)
      this.$emit('update-check', checked, boxName)
    }
  }
}
</script>


