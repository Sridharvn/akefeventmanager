<template>
  <div id="todosPage">
    <h1>Todos</h1>
    <div id="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add a new todo" v-on:keyup.enter="addTodo" id="newTodoInput" />
      <span><button @click="addTodo" id="addButton">Add</button></span>
    </div>
    <div v-for="(todo) in todoList.slice().reverse()" :key="todo" id="todoList">
      <!-- {{ todo }} -->
      <TodoElement :todo="todo" @completeTodo="completeTodo(todo.id)" @removeTodo="removetodo(todo.id)"
        :currentUser="currentUser" :key="todo.id" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, watch } from 'vue';
import TodoElement from '../components/todoElement.vue'
import { date, useQuasar } from 'quasar';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy, limit } from "firebase/firestore";
import { db, app } from '../firebase';
import { getAuth } from 'firebase/auth';
const { reactive, ref } = require("@vue/reactivity");
const $q = useQuasar();
const newTodo = ref('');
const todoList = ref([]);
const auth = getAuth(app);
var currentUser = ref('');
const todosref = collection(db, "todos");
const todoscollectionquery = query(todosref, orderBy("time", "asc"));
async function addTodo() {
  if (newTodo.value.length > 0) {
    await addDoc(todosref, {
      title: newTodo.value,
      completed: false,
      time: Date.now(),
      assignee: auth.currentUser.displayName
    });
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

  newTodo.value = '';
}
async function completeTodo(id) {
  // const trueIndex = todoList.length - index - 1;
  // todoList[trueIndex].completed = !todoList[trueIndex].completed;
  const index = todoList.value.findIndex(todo => todo.id === id);
  var completedUser = '';
  var completedTime = '';
  if (!todoList.value[index].completed) {
    completedUser = auth.currentUser.displayName;
    completedTime = Date.now();
  } else {
    completedUser = '';
    completedTime = '';
  }
  await updateDoc(doc(db, "todos", id), {
    completed: !todoList.value[index].completed,
    completedBy: completedUser,
    completedTime: completedTime
  });
  if (todoList.value[index].completed) {
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
function removetodo(id) {
  const index = todoList.value.findIndex(todo => todo.id === id);
  deleteDoc(doc(db, "todos", id));
  $q.notify({
    message: 'Task removed',
    color: 'negative'
  })
}
// Get todos on Mounted
onMounted(async () => {
  onSnapshot(todoscollectionquery, (querySnapshot) => {
    const auth = getAuth(app);
    currentUser.value = auth.currentUser.displayName;
    // console.log(currentUser);
    const allTodos = [];
    querySnapshot.forEach((doc) => {
      let fetchedTodo = {
        id: doc.id,
        title: doc.data().title,
        completed: doc.data().completed,
        time: doc.data().time,
        assignee: doc.data().assignee,
        completedBy: doc.data().completedBy,
        completedTime: doc.data().completedTime
      }
      // console.log(fetchedTodo);
      allTodos.push(fetchedTodo);
    });
    todoList.value = allTodos;
  });
});
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  color: $textcolor;
}

input {
  width: 95%;
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

#todosPage {
  background-color: $background;
}

// #newTodoInput {
//   width: 100%;
//   margin-bottom: 10px;
// }
</style>
