<template>
  <div class="un-max-window">
    <div class="front-square"></div>
    <div class="back-square"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UnMaxWinIcon',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.un-max-window {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  .front-square,
  .back-square {
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 2px;
    background: #fff;
  }
  .front-square {
    z-index: 1100;
    border: 1px solid var(--ula-icon-bg);
  }

  .back-square {
    
    border: 1px solid var(--ula-icon-bg);
    transform: translate(2.5px, -2.5px);
  }

  &:hover {
    .front-square,
    .back-square {
      border-color: var(--ula-icon-bg-hover);
    }
  }
}
</style>
