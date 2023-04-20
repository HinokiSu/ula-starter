<template>
  <div class="header-menu">
    <burger-menu-icon @click="openMenu"></burger-menu-icon>
    <div class="app-title">
      <span>Ula Starter</span>
    </div>
    <div class="win-control">
      <min-win-icon @click="minWinControl"></min-win-icon>
      <max-win-icon v-if="!isMaximize" @click="maxWinControl"></max-win-icon>
      <un-max-win-icon v-else @click="unMaxWinControl"></un-max-win-icon>
      <close-win-icon @click="closeWinControl"></close-win-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import BurgerMenuIcon from '@components/header-icons/burger-menu-icon.vue'
import MinWinIcon from '@components/header-icons/min-win-icon.vue'
import MaxWinIcon from '@components/header-icons/max-win-icon.vue'
import CloseWinIcon from '@components/header-icons/close-win-icon.vue'
import UnMaxWinIcon from '@components/header-icons/un-max-win-icon.vue'
import { useWinStore } from '@stores/win-store'

export default defineComponent({
  name: 'HeaderMenu',
  components: {
    BurgerMenuIcon,
    MinWinIcon,
    MaxWinIcon,
    CloseWinIcon,
    UnMaxWinIcon
  },
  setup() {
    const winStore = useWinStore()
    const isMaximize = computed(() => winStore.isMaximize)

    onMounted(async () => {
      await winStore.getWinMaximizeState()
    })

    const minWinControl = async () => {
      await window.electronAPI.minimizeWin()
    }
    const maxWinControl = async () => {
      await window.electronAPI.maximizeWin()
    }
    const closeWinControl = async () => {
      await window.electronAPI.closeWin()
    }
    const unMaxWinControl = async () => {
      await window.electronAPI.unMaximizeWin()
    }

    /* Menu */
    const openMenu = async (e: PointerEvent) => {
      await window.electronAPI.openMenu(e.x, e.y)
    }
    return { isMaximize, minWinControl, maxWinControl, closeWinControl, unMaxWinControl, openMenu }
  }
})
</script>

<style lang="less" scoped>
.header-menu {
  position: fixed;
  background: #fff;
  height: 32px;
  width: 100%;
  z-index: 999;

  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  padding-left: 6px;

  .app-title {
    position: absolute;
    top: 4px;
    left: 46%;
    font-size: 0.875rem;
    font-weight: 500;
    color: #555;
  }

  .win-control {
    -webkit-app-region: no-drag;
    position: absolute;
    top: 4px;
    right: 0;
    display: flex;
    align-items: center;
    column-gap: 16px;
    padding-left: 20px;
    margin-right: 8px;
  }
}
</style>
