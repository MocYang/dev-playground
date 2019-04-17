<template>
  <div>
    <span>模板语法</span>
    <p
      v-if="exchangeProduct.some(function (p) {return p.id === 213 || p.id === 214 || p.id === 216} )"

    >
      saldfjasdf
    </p>
  </div>
</template>

<script>
  //       v-if="exchangeProduct.some(p => p.id === 213 || p.id === 214 || p.id === 216)"

  export default {
    name: 'TestIf',
    data() {
      return {
        exchangeProduct: [
          {
            id: 216
          },
          {
            id: 213
          },
          {
            id: 2
          },
          {
            id: 1
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
