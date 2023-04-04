<template>
  <div class="ula-card-wrapper">
    <div class="ula-card-container" :style="styles">
      <div class="ula-card-head" v-if="title">
        <div class="ula-card-title">{{ title }}</div>
        <!-- <ula-separator></ula-separator> -->
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
    },
    radius: {
      type: String,
      default: '14px'
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const styles = ref('')
    const propsVal = computed(() => props)
    styles.value = inlineStyles({
      width: propsVal.value.wd,
      'min-width': propsVal.value.minWd,
      'max-width': propsVal.value.maxWd,
      height: propsVal.value.hg,
      'border-radius': propsVal.value.radius
    })

    return { styles }
  }
})
</script>

<style lang="less" scoped>
@--ula-card-transition: transform 0.25s ease 0s, filter 0.25s ease 0s, box-shadow 0.25s ease 0s;
@--ula-card-text-color: #11181c;
@--ula-card-drop-shadow: drop-shadow(0 12px 24px rgb(104 112 118 / 0.15))
  drop-shadow(0 12px 14px rgb(104 112 118 / 0.1));
.ula-card {
  &-wrapper {
    padding: calc(2 * 0.375rem);
    margin: 0;
  }

  &-container {
    max-width: min-content;
    height: auto;
    margin: 0px;
    padding: 0px;

    border-style: solid;
    border-color: var(--ula-colors-border);
    border-width: 1px;

    transform: translateZ(0px);
    backface-visibility: hidden;
    transition: @--ula-card-transition;
    background: #fff;
    color: @--ula-card-text-color;
    position: relative;
    display: inline-flex;
    overflow: hidden;
    flex-direction: column;
    box-sizing: border-box;
    outline: none;
    &:hover {
      filter: @--ula-card-drop-shadow;
      transform: translateY(-4px);
    }
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
    padding: 0.625rem;
    border-bottom: 1px solid #eaeaea;
    cursor: pointer;
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
    color: @--ula-card-text-color;

    font-size: 0.875rem;
    font-weight: 500;

    &.has-title {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
  }
}
</style>
