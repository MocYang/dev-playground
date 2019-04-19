<template>
  <div>
    <span>模板语法</span>
    <p
      v-if="(exchangeProduct.some(function (p) {return p.id == 213 || p.id == 214 || p.id == 216})) &&
                                  (+ Date.now() < new Date('2019-05-05 0:0:0').getTime())"
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
            id: 213
          },
          {
            id: 21
          },
          {
            id: 2
          },
          {
            id: 1
          },
        ],
        dateBeforeMayFive: this.isTodayBeforeMayFive()
      }
    },
    methods: {
      isTodayBeforeMayFive () {
        const now = +Date.now()
        // const now = new Date('2019-05-04 23:59:59').getTime()
        // const now = new Date('2019-05-05 0:0:0').getTime()
        const milliSecondsOfMayFive = new Date('2019-05-05 0:0:0').getTime()
        console.log(milliSecondsOfMayFive > now)
        return milliSecondsOfMayFive > now
      }
    }
  }
</script>

<style scoped>

</style>
