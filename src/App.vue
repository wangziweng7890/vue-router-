<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div id="nav">
      <router-link to='/'>去首页</router-link>
      <router-link to='/two'>去第二页</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import one from '../src/view/one'
import two from '../src/view/two'

export default {
  name: 'app',
  components: {
    one,two
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
