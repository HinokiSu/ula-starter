<template>
  <div class="dashboard-wrapper">
    <ula-dashboard-head></ula-dashboard-head>
    <div class="dashboard-content">
      <div class="content-cmd">
        <ula-terminal></ula-terminal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UlaTerminal from '@components/terminal/terminal.vue'
import UlaDashboardHead from './dashboard-head.vue'
export default defineComponent({
  name: 'Dashboard',
  components: {
    UlaTerminal,
    UlaDashboardHead
  },
  setup() {}
})
</script>

<style lang="less" scoped></style>
