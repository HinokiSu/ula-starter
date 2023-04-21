<template>
  <div class="dashboard-head">
    <div class="left-container">
      <div class="config-uipath-log">
        <ula-button
          color="primary"
          :disabled="runState"
          class="open-dialog-btn"
          @click="OpenSetLogDir"
          :title="$t('button.openLogRootPath')"
        />
        <ula-card
          radius="10px"
          min-wd="200px"
          max-wd="400px"
          :title="$t('title.uipathLogPath')"
          class="log-dir"
        >
          <span>
            {{ config.uipathLogDir }}
          </span>
        </ula-card>
      </div>
    </div>

    <div class="right-container">
      <ula-button
        color="gradient"
        v-if="!runState"
        class="head-starter"
        @click="clickStarter"
        :title="$t('button.start')"
      >
        <template #preIcon>
          <play-icon />
        </template>
      </ula-button>
      <ula-button
        v-else
        color="gradient"
        active
        class="head-starter"
        @click="clickStop"
        :title="$t('button.stop')"
      >
        <template #preIcon>
          <dot-loading color="#fff"></dot-loading>
        </template>
      </ula-button>
      <ula-button
        color="gradient"
        :class="['open-ula-url', runState ? 'show' : '']"
        :title="$t('button.openUla')"
        @click="goToUlaPage"
      >
        <template #preIcon>
          <send-icon></send-icon>
        </template>
      </ula-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { TModConfigRes } from '@interfaces/ula-config'
import UlaInput from '@components/input/input.vue'
import UlaButton from '@components/button/button.vue'
import UlaCard from '@components/card/card.vue'
// icons
import PlayIcon from '@components/icons-comp/play-icon.vue'
import DotLoading from '@components/loading/dot-loading.vue'
import SendIcon from '@components/icons-comp/send-icon.vue'
import { useLogStore } from '@stores/log-store'
import { TReply } from '@interfaces/reply-type'

export default defineComponent({
  name: 'UlaDashboardHead',
  components: {
    UlaInput,
    UlaButton,
    UlaCard,
    // icons
    PlayIcon,
    DotLoading,
    SendIcon
  },
  setup() {
    const config = reactive({
      uipathLogDir: ''
    })
    const runState = ref(false)
    const logStore = useLogStore()
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
      console.log('dirPath: ', dirPath)
      if (!dirPath.state) {
        console.log(dirPath.msg)
      } else {
        config.uipathLogDir = dirPath.config as string
      }
    }

    const clickStarter = async () => {
      runState.value = !runState.value
      if (config.uipathLogDir.trim() === '') {
        console.log('Warn: Uipath log directory is needed, not allowed to be empty!')
      } else {
        // start
        const res = await window.electronAPI.startRunUla()
        console.log('[ULA]: Start info: ', res)
        if (res.status !== 'running') {
          runState.value = false
          console.log('[ULA]: ', res.msg)
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
          // initial list
          logStore.logList = []
          // start polling ula log
          await window.electronAPI.startPollingGetUlaLog(runState.value)
          await window.electronAPI.receiveParsedUlaLog(async (event: any, value: TReply) => {
            if (!value.flag) {
              console.log('Error: ', value.msg)
              await window.electronAPI.stopRunUla()
            } else {
              // store in Pinia store
              logStore.setLogData(value.data)
            }
          })
        }
      }
    }

    const clickStop = async () => {
      if (runState.value) {
        runState.value = false
        await window.electronAPI.stopPollingUlaLog(runState.value)
        const stopRes = await window.electronAPI.stopRunUla()
        if (stopRes) {
          console.log('[ULA]: Stop success')
        } else {
          console.log('[ULA]: Stop failed')
        }
      }
    }

    const goToUlaPage = async () => {
      await window.electronAPI.openUlaPage(true)
    }

    return { config, runState, clickStarter, clickStop, OpenSetLogDir, goToUlaPage }
  }
})
</script>

<style lang="less" scoped>
@--ula-shadow-md: 0 12px 20px 6px rgba(18, 18, 19, 0.097);

.dashboard-head {
  display: flex;
  padding-top: 1.25rem;
  padding-bottom: 1rem;
  box-shadow: @--ula-shadow-md;

  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;

  transition: box-shadow 0.15s ease;

  .left-container {
    width: 60%;
    border-right: 1px solid #eaeaea;

    .open-dialog-btn {
      margin-left: 12px;
    }
  }

  .right-container {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1.5rem;

    .open-ula-url {
      height: 0px;
      width: 0px;
      padding: 0px;
      transition: all 0.3s ease;
      transform: translateX(0) translateY(24px);
      opacity: 0;
      &.show {
        height: 2.5rem;
        opacity: 1;
        transform: translate(0, 0);
        min-width: min-content;
        padding: 2px;
      }
    }
  }
}
</style>
