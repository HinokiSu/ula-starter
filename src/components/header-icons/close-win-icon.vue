<template>
  <div class="close-window">
    <div class="win-icon">
      <div class="top-right line"></div>
      <div class="top-left line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CloseWinIcon',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.close-window {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  .win-icon {
    .line {
      width: 1rem;
      height: 1px;
      background-color: var(--ula-icon-bg);
    }
    .top-right {
      transform: rotate(135deg);
    }

    .top-left {
      transform: rotate(45deg);
    }
  }

  &:hover {
    .line {
      background: var(--ula-icon-bg-hover);
    }
  }
}
</style>
