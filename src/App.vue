<template>
  <main-layout> </main-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import mainLayout from './layout/main-layout.vue'
export default defineComponent({
  name: 'AppMain',
  components: { mainLayout },
  setup() {
    
    return {}
  }
})
</script>

<style  scoped></style>
