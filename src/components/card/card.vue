<template>
  <div class="ula-card-wrapper">
    <div class="ula-card-container" :style="styles">
      <div class="ula-card-head" v-if="title">
        <div class="ula-card-title">{{ title }}</div>
        <ula-separator></ula-separator>
      </div>
      <div :class="['ula-card-content', title === '' ? 'has-title' : '']">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import inlineStyles from '../../hooks/inline-styles'
import UlaSeparator from '../separator/separator.vue'
export default defineComponent({
  name: 'UlaCard',
  components: {
    UlaSeparator
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    minWd: {
      type: String
    },
    maxWd: {
      type: String
    },
    wd: {
      type: String
    },
    hg: {
      type: String
    }
  },
  setup(props) {
    const styles = ref('')
    const propsVal = computed(() => props)
    styles.value = inlineStyles({
      width: propsVal.value.wd,
      'min-width': propsVal.value.minWd,
      'max-width': propsVal.value.maxWd,
      height: propsVal.value.hg
    })

    return { styles }
  }
})
</script>

<style lang="less" scoped>
.ula-card {
  --ula-transition-card: transform 0.25s ease 0s, filter 0.25s ease 0s, box-shadow 0.25s ease 0s;
  --ula-cardTextColor: #11181c;

  &-wrapper {
    padding: calc(2 * 0.375rem);
    margin: 0;
  }

  &-container {
    border-style: solid;
    border-color: var(--ula-colors-border);
    border-width: 1px;
    transform: translateZ(0px);
    backface-visibility: hidden;
    transition: var(--ula-transition-card);
    margin: 0px;
    padding: 0px;
    border-radius: 14px;
    background: #fff;
    color: var(--ula-cardTextColor);
    position: relative;
    display: inline-flex;
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    outline: none;
  }

  &-head {
    width: 100%;
  }

  &-title {
    width: 100%;
    display: flex;
    flex-shrink: 0;
    z-index: 100;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    color: inherit;
    padding: 0.75rem;
  }

  &-content {
    display: flex;
    width: 100%;
    height: auto;
    flex: 1 1 auto;
    flex-direction: column;
    place-content: inherit;
    align-items: inherit;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    overflow-y: auto;
    position: relative;
    text-align: left;
    word-break: break-all;
    color: var(--ula-cardTextColor);

    
    font-size: 0.875rem;
    font-weight: 500;

    &.has-title {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
  }
}
</style>
