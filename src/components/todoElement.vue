<template>
  <div id="todo">
    <h3>{{ todo.title }}</h3>
    <h5>{{ todo.completed }}</h5>
  </div>
</template>
<script setup>
// defineProps('todo', {
//   title: String,
//   completed: Boolean
// });
const props = defineProps({
  todo: {
    title: String,
    completed: Boolean
  }
});
</script>
<style lang="scss" scoped>
#todo {
  background-color: #f0f0f0;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
}
</style>
