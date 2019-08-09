<template>
  <span>
    <input
      type="checkbox"
      v-model="categoryLists[info.name]['checked']"
      name="info.name"
    />
    {{info.no}}({{info.name}})
  </span>
</template>

<script>

export default {
  name: "FilterOptions",
  props: ["info", "categoryLists"]
}
</script>
