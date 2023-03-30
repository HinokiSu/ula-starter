<template>
  <div class="ula-separator"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'UlaSeparator',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.ula-separator {
  margin: 0;
  height: calc(1px);
  background: var(--ula-colors-border);
  width: 100%;
  max-width: 100%;
  position: relative;
}
</style>
