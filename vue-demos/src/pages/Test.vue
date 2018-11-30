<template>
  <div class="content">
    <h1>test component</h1>
    <input type="text" v-model="cName"/>
    <input type="text" v-model="cAge">
    <button @click="handleLogName">log name</button>
    <button @click="handleGetInfo">get info</button>
    <p>{{`${cName} ${cAge}`}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Test',
    data () {
      return {
        text: ''
      }
    },
    created () {
      this.$Bus.$on('nameChange', (data) => {
        console.log(data)
      })
    },
    computed: {
      cName: {
        get () {
          return this.$Bus.state.name
        },
        set (name) {
          this.$Bus.commit('setName', name)
        }
      },
      cAge: {
        get () {
          return this.$Bus.state.age
        },
        set (age) {
          this.$Bus.commit('setAge', age)
        }
      }
    },
    methods: {
      handleLogName () {
        this.$Bus.$emit('nameChange', this.cName)
      },
      handleGetInfo () {
        this
          .$axios
          .get('/api/info')
          .then(res => {
            console.log(res.data)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
