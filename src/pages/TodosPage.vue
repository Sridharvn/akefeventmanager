<template>
  <div>
    <h1>Todos</h1>
    <div id="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add a new todo" v-on:keyup.enter="addTodo" id="newTodoInput" />
      <span><button @click="addTodo" id="addButton">Add</button></span>
    </div>
    <div v-for="(todo, index) in todoList.slice().reverse()" :key="todo" id="todoList">
      <TodoElement :todo="todo" @completeTodo="completeTodo(index)" @removeTodo="removetodo(index)" />
    </div>
  </div>
</template>
<script setup>
import { watch } from 'vue';
import TodoElement from '../components/todoElement.vue'
import { useQuasar } from 'quasar';
const { reactive, ref } = require("@vue/reactivity");



const $q = useQuasar();
const newTodo = ref('');
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

function addTodo() {
  if (newTodo.value.length > 0) {
    todoList.push({
      id: todoList.length + 1,
      title: newTodo.value,
      completed: false
    });
    newTodo.value = '';
    $q.notify({
      message: 'Task added',
      color: 'secondary'
    })
  }
  else {
    $q.notify({
      message: 'Task cannot be empty',
      color: 'negative'
    })
  }
}
function completeTodo(index) {
  const trueIndex = todoList.length - index - 1;
  // console.log(todoList[trueIndex]);
  todoList[trueIndex].completed = !todoList[trueIndex].completed;
  if (todoList[trueIndex].completed) {
    $q.notify({
      message: 'Task completed',
      color: 'positive'
    })
  }
  else {
    $q.notify({
      message: 'Task not completed',
      color: 'negative'
    })
  }
}
function removetodo(index) {
  const trueIndex = todoList.length - index - 1;
  // console.log(todoList[trueIndex]);
  if (!todoList[trueIndex].completed) {
    $q.notify({
      message: 'Incomplete task cannot be removed',
      color: 'negative'
    })
  }
  else {
    todoList.splice(trueIndex, 1);
    $q.notify({
      message: 'Task removed',
      color: 'negative'
    })
  }
}
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  color: $textcolor;
}

input {
  width: 80%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid $secondary;
  background-color: $background;
  color: $textcolor;
}

button {
  padding: 10px;
  border-radius: 5px;
  background-color: $background;
  border: 1px solid $secondary;
  color: $textcolor;
}

#addTodo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

// #newTodoInput {
//   width: 100%;
//   margin-bottom: 10px;
// }
</style>
