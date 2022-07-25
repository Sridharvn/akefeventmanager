<template>
  <div id="todo">
    <h3>{{ todo.title }}</h3>
    <!-- <h5>{{ todo.completed }}</h5> -->
    <button @click="$emit('completeTodo')" id="completeButton">
      {{ todo.completed ? 'Completed' : 'Not Completed' }}
    </button>
    <button @click="$emit('removeTodo')">Remove</button>
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
// check if todo is completed and change the button color accordingly
watch(props.completed, (newValue) => {
  if (newValue) {
    document.getElementById('completeButton').style.backgroundColor = 'green';
  }
  else {
    document.getElementById('completeButton').style.backgroundColor = 'red';
  }
});
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
</style>
