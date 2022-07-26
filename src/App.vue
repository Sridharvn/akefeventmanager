<template>
  <router-view id="bg" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
<style lang="scss" scoped>
#bg {
  background-color: $background;
}
</style>
