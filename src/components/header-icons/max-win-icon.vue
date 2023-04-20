<template>
  <div class="max-window">
    <div class="win-icon"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MaxWinIcon',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.max-window {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  .win-icon {
    width: 0.825rem;
    height: 0.825rem;
    border: 1px solid var(--ula-icon-bg);
    border-radius: 2px;
  }

  &:hover {
    .win-icon {
        border-color: var(--ual-icon-bg-hover);
    }
  }
}
</style>
