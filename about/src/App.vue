<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { versions } from 'process'
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const test = () => {
  window.about.test('我是真的喜欢你')
}
const recive = ref<string>('')
window.about.test1((_, value) => {
  recive.value = value
})
const node = window.versions.node
const electron = window.versions.electron
const chrome = window.versions.chrome
</script>

<template>
  <div>
    <div>node {{ node }}</div>
    <div>chrome {{ chrome }}</div>
    <div>electron {{ electron }}</div>
    <div>recive: {{ recive }}</div>
    <button @click="test">test</button>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue + Electron" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
