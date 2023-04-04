<template>
  <div class="ula-terminal-wrapper">
    <div class="terminal-container">
      <div class="terminal-header">
        <span class="terminal-icon"></span>
        <span class="terminal-icon"></span>
        <span class="terminal-icon"></span>
      </div>

      <div class="terminal-body">
        <ula-log-line> </ula-log-line>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import UlaLogLine from './log-line.vue'
export default defineComponent({
  name: 'UlaTerminal',
  components: {
    UlaLogLine
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
@--ula-terminal-sans: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
  Bitstream Vera Sans Mono, Courier New, monospace;

.ula-terminal-wrapper {
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  height: 300px;
  min-height: calc(67vh);
}
.terminal {
  &-container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 5px;
    border: 1px solid #333;
    background: #000;
    color: #fff;
    font-family: @--ula-terminal-sans;
    line-height: 1.5;
    font-size: 14px;
    white-space: pre-wrap;
    word-break: break-all;

    background: #191724;
    color: #e0def4;
    border-color: #000;
  }

  &-header {
    height: 34px;
    display: flex;
    align-items: center;
    text-align: center;
  }

  &-icon {
    border-radius: 50%;
    display: inline-block;
    width: 12px;
    height: 12px;

    &:first-of-type {
      background: #ff5f56;
      margin-left: 12px;
    }

    &:nth-of-type(2) {
      background: #ffbd2e;
    }

    &:nth-of-type(3) {
      background: #27c93f;
    }

    & + .terminal-icon {
      margin-left: 8px;
    }
  }

  &-body {
    padding: 12px 14px;
    flex: 1 1;
    overflow: auto;
  }
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-thumb {
  background-color: #eeeded;
  border-radius: 12px;
  border: 4px solid #000;
}

*::-webkit-scrollbar:horizontal {
  height: 12px;
}

*::-webkit-scrollbar-thumb:horizontal {
  border-radius: 12px;
  border: 4px solid #9b9898;
  /* background-color: #e5e4e4; */
}

*::-webkit-scrollbar-thumb:horizontal:hover {
  background-color: #363434;
}
</style>
