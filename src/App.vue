<template>
  <div id="app">
    <app-text :value="message"/>
  </div>
</template>

<script>
import AppText from './components/Text.vue'

export default {
  name: 'App',
  data: () => ({
    message: window.$config.message
  }),
  components: {
    AppText
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
