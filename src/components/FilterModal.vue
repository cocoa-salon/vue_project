<template>
  <div>
    <h3>필터</h3>
    <div style="cursor:pointer" @click="handleModalToggle">X</div>
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
  props: ["isCategoryChecked", "isModalOn"],
  methods: {
    // 부모 메서드 호출(카테고리 별 GET 요청)
    saveOption () {
      this.$emit('save-option')
    },
    // 부모 메서드 호출(체크 상태 업데이트)
    handleCheck (e) {
      const checked = e.target.checked
      const boxName = e.target.name
      this.$emit('update-check', checked, boxName)
    },
    // 부모 메서드 호출(모달 창 토글)
    handleModalToggle () {
      this.$emit('toggle-modal')
      // CSS 속성 설정
    }
  }
}
</script>


