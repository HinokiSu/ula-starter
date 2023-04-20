<template>
  <div class="hamburger-menu">
    <div class="win-icon">
      <div class="line item-1"></div>
      <div class="line item-2"></div>
      <div class="line item-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BurgerMenuIcon',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.hamburger-menu {
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-app-region: no-drag;
  .win-icon {
    display: flex;
    flex-direction: column;

    .line {
      width: 14px;
      height: 2px;
      background: var(--ula-icon-bg);
      margin: 1px 0;
    }
    &:hover {
      .line {
        background: var(--ula-icon-bg-hover);
      }
    }
  }
}
</style>
