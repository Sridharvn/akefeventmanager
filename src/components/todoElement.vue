<template>
  <div>
    <div id="todo"
      :style="{ 'background-color': todo.completed ? 'rgba(0, 128, 0, 0.144)' : 'rgba(128, 0, 0, 0.144)' }">
      <h3
        :style="[{ color: (todo.completed ? 'green' : 'red') }, { 'text-decoration': (todo.completed ? 'line-through' : 'none') }]">
        {{
            todo.title
        }}</h3>

      <button @click="$emit('removeTodo')" v-if="todo.completed && todo.assignee === currentUser"
        id="remove">Remove</button>
      <button @click="$emit('completeTodo')" id="completeButton">
        <!-- {{ todo.completed ? 'Completed' : 'Not Completed' }} -->
        <!-- green tick if completed, and red cross if not completed -->
        <span v-if="todo.completed" id="complete">&#10004; Completed</span>
        <span v-else id="incomplete">Not Completed &#10006;</span>
      </button>
    </div>
    <div id="assigneeandcompletion">

      <div class="full-width row wrap justify-center items-center content-center">
        <q-space>
        </q-space>
        Assignee : {{ todo.assignee }}
        <q-space></q-space>
        <div v-if="todo.time">Time : {{ assignedTime }}</div>
        <q-space />
      </div>
      <div class="full-width row wrap justify-center items-center content-center">
        <q-space />
        <div v-if="todo.completedBy">Completed By : {{ todo.completedBy }}</div>
        <q-space></q-space>
        <div v-if="todo.completedTime">Completed Time : {{ completedTime }}</div>
        <q-space />
      </div>
    </div>
  </div>
</template>
<script setup>
import moment from 'moment'
// defineProps('todo', {
//   title: String,
//   completed: Boolean
const { onMounted, watch, ref } = require("@vue/runtime-core");
var assignedTime = ref('');
var completedTime = ref('');

// });
const props = defineProps({
  todo: {
    title: String,
    completed: Boolean
  }, currentUser: String
});
const emit = defineEmits([
  'removeTodo', 'completeTodo'
]);

onMounted(() => {
  assignedTime.value = moment(props.todo.time).fromNow();
  completedTime.value = moment(props.todo.completedTime).fromNow();
  // console.log(assignedTime.value);
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

button #complete {
  color: $positive;
}

button #incomplete {
  color: $negative;
}

#remove {
  color: $negative;
}

#assigneeandcompletion {
  color: $info;
  font-size: large;
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

  #assigneeandcompletion {
    font-size: smaller;
  }
}
</style>
