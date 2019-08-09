<template>
  <div class="custom-control custom-checkbox">
    <input
      type="checkbox"
      class="custom-control-input"
      id="customCheck1"
      v-model="categoryLists[info.name]['checked']"
      name="info.name"
    />
    <label class="custom-control-label" for="customCheck1">
      {{info.no}}({{info.name}})
    </label>
  </div>
</template>

<script>
export default {
  name: "FilterOptions",
  props: ["info", "categoryLists"]
}
</script>

