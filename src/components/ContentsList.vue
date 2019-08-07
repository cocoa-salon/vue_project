<template>
  <div>hello world!</div>
</template>

<script>
export default {
  name: "ContentsList",
  data: () => ({ testData: [] }),
  methods: {
    test () {
      console.log("hello world!")
    }
  },
  mounted () {
    console.log("Component mounted.")
  }
}
</script>
