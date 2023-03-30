<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-head">
      <div class="config-uipath-log">
        <ula-button
          color="primary"
          :disable="runState"
          class="open-dialog-btn"
          @click="OpenSetLogDir"
          >Open Log Directory</ula-button
        >
        <ula-card min-wd="200px" max-wd="400px" title="Uipath Log Path" class="log-dir">
          <span>
            {{ config.uipathLogDir }}
          </span>
        </ula-card>
        <!-- <ula-input v-model:value="config.uipath" :placeholder="'Uipath 日志路径'"></ula-input> -->
      </div>
      <div class="start-btn-group">
        <!-- TODO: Add stop state icon -->
        <ula-button color="gradient" v-if="!runState" class="head-starter" @click="clickStarter"
          >Start</ula-button
        >
        <ula-button v-else color="gradient" active class="head-starter" @click="clickStop"
          >Stop</ula-button
        >
      </div>
    </div>
    <div class="dashboard-content">
      <div class="content-cmd">
        <ula-terminal></ula-terminal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import UlaInput from '../components/input/input.vue'
import UlaButton from '../components/button/button.vue'
import UlaTerminal from '../components/terminal/terminal.vue'
import UlaCard from '../components/card/card.vue'
import { TModConfigRes } from '../interfaces/ula-config'
export default defineComponent({
  name: 'Dashboard',
  components: {
    UlaInput,
    UlaButton,
    UlaTerminal,
    UlaCard
  },
  setup() {
    const config = reactive({
      uipathLogDir: ''
    })
    const runState = ref(false)
    const getOldUlaLogDir = async () => {
      const oldPath: TModConfigRes = await window.electronAPI.getOldUipathLogDirs()
      if (!oldPath.state) return console.log(oldPath.msg)
      config.uipathLogDir = oldPath.config as string
    }
    onMounted(() => {
      getOldUlaLogDir()
    })

    const OpenSetLogDir = async () => {
      // get log dir from electron
      const dirPath = await window.electronAPI.pickUipathLogDirs()
      if (!dirPath.state) return console.log(dirPath.msg)
      config.uipathLogDir = dirPath.config as string
    }

    watch(
      () => runState.value,
      async (newVal, oldVal) => {
        if (newVal) {
          await window.electronAPI.receiveParsedUlaLog((event: any, arg: any) => {
            // store in Pinia store
            console.log(arg)
          })
        }
      }
    )

    const clickStarter = async () => {
      runState.value = !runState.value
      if (config.uipathLogDir.trim() === '') {
        console.log('Warn: Uipath log directory is needed, not allowed to be empty!')
      } else {
        // start
        const res = await window.electronAPI.startRunUla()
        console.log('[ULA]: Start info: ', res)
        if (res.status !== 'running') {
          console.log('[ULA]: ', res.msg)
          runState.value = false
          // stop
          const stopRes = await window.electronAPI.stopRunUla()
          if (stopRes) {
            console.log('[ULA]: Stop success')
          } else {
            console.log('[ULA]: Stop failed')
          }
        } else {
          runState.value = true
          console.log('[ULA Vue]: start polling...')
          await window.electronAPI.pollingGetUlaLog(runState.value)
        }
      }
    }

    const clickStop = async () => {
      if (runState.value) {
        const stopRes = await window.electronAPI.stopRunUla()
        if (stopRes) {
          runState.value = false
          console.log('[ULA]: Stop success')
        } else {
          console.log('[ULA]: Stop failed')
        }
      }
    }

    return { config, runState, clickStarter, clickStop, OpenSetLogDir }
  }
})
</script>

<style lang="less" scoped>
.dashboard-head {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  padding-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  box-shadow: 0px 4px 5px #eaeaea;

  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  border: 1px solid #eaeaea;
  // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.15s ease;

  .config-uipath-log {
    .open-dialog-btn {
      width: 8rem;
    }
  }
  .head-starter {
  }
}
</style>
