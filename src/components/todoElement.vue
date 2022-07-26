<template>
  <div id="todo" :style="{ 'background-color': todo.completed ? 'rgba(0, 128, 0, 0.144)' : 'rgba(128, 0, 0, 0.144)' }">
    <h3
      :style="[{ color: (todo.completed ? 'green' : 'red') }, { 'text-decoration': (todo.completed ? 'line-through' : 'none') }]">
      {{
          todo.title
      }}</h3>
    <button @click="$emit('removeTodo')" v-if="todo.completed" id="remove">Remove</button>
    <button @click="$emit('completeTodo')" id="completeButton">
      <!-- {{ todo.completed ? 'Completed' : 'Not Completed' }} -->
      <!-- green tick if completed, and red cross if not completed -->
      <span v-if="todo.completed" id="complete">&#10004; Completed</span>
      <span v-else id="incomplete">Not Completed &#10006;</span>
    </button>

  </div>
</template>
<script setup>
// defineProps('todo', {
//   title: String,
//   completed: Boolean

const { onMounted, watch } = require("@vue/runtime-core");

// });
const props = defineProps({
  todo: {
    title: String,
    completed: Boolean
  }
});
const emit = defineEmits([
  'removeTodo', 'completeTodo'
]);
</script>
<style lang="scss" scoped>
#todo {
  background-color: $background;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: $secondary 1px solid;
  color: $textcolor;
}

button {
  padding: 10px;
  border-radius: 5px;
  background-color: $background;
  border: 1px solid $secondary;
  color: $textcolor;
}

button #complete {
  color: $positive;
}

button #incomplete {
  color: $negative;
}

#remove {
  color: $negative;
}

@media screen and (max-width: 600px) {
  // #todo {
  //   flex-direction: column;
  // }

  h3 {
    font-size: small;
  }

  button {
    font-size: small;
  }
}
</style>
