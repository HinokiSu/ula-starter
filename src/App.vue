<template>
  <main-layout> </main-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'
import mainLayout from './layout/main-layout.vue'
import { useLangStore } from '@stores/lang-store'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'AppMain',
  components: { mainLayout },
  setup() {
    const i18n = useI18n()
    const langStore = useLangStore()
    onMounted(async () => {
      await langStore.setLanguage()
    })

    watch(
      () => langStore.language,
      (newVal, oldVal) => {
        if (newVal === 'zh') {
          i18n.locale.value = 'zh'
          localStorage.setItem('language', 'zh')
        } else {
          i18n.locale.value = 'en'
          localStorage.setItem('language', 'en')
        }
      },
      {
        immediate: true
      }
    )
    return {}
  }
})
</script>

<style scoped></style>
