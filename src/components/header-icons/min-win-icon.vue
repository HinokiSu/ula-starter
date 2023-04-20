<template>
  <div class="min-window">
    <div class="win-icon"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MinWinIcon',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.min-window {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  .win-icon {
    width: 16px;
    border-bottom: 1px solid var(--ula-icon-bg);
  }
  &:hover {
    .win-icon {
      border-bottom-color: var(--ula-icon-bg-hover);
    }
  }
}
</style>
