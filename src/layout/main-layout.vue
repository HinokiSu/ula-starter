<template>
  <div class="main-layout">
    <header-menu></header-menu>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderMenu from './header-menu.vue'
export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderMenu
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.main-layout {
  .main-content {
    padding-top: 40px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
