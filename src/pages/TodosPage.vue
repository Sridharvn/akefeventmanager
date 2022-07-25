<template>
  <div>
    <h1>Todos</h1>
    <div v-for="todo in todoList" :key="todo">
      <TodoElement :todo="todo" />
    </div>
  </div>
</template>
<script setup>
import TodoElement from '../components/todoElement.vue'
const { reactive } = require("@vue/reactivity");

const todoList = reactive([
  {
    id: 1,
    title: "Learn Vue",
    completed: false
  },
  {
    id: 2,
    title: "Learn Vuex",
    completed: false
  },
  {
    id: 3,
    title: "Learn Vue Router",
    completed: false
  }
]);
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
