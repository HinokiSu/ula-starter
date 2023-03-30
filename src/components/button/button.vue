<template>
  <div class="ula-button">
    <div class="ula-button-wrapper">
      <button class="ula-button" :disabled="disable" @click="clickHandler" :class="classes">
        <span class="ula-button-text">
          <slot></slot>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'UlaButton',
  props: {
    color: {
      type: String,
      default: 'default'
    },
    disable: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    // TODO: Add more type button
    const propsRef = computed(() => props)
    const clickHandler = () => {
      emit('click')
    }
    const classes = [
      propsRef.value.disable ? '' : propsRef.value.color,
      propsRef.value.disable ? 'is-disabled' : '',
      propsRef.value.active ? 'is-active' : ''
    ]

    return {
      clickHandler,
      classes
    }
  }
})
</script>

<style lang="less" scoped>
.ula-button {
  padding: calc(2 * 0.375rem);
}
.ula-button-wrapper {
  width: 100%;
  margin: 0;

  .ula-button {
    padding-left: 0.875rem;
    padding-right: 0.875rem;
    height: 2.5rem;
    line-height: 2.5rem;
    width: inherit;
    font-size: 0.875rem;

    color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    box-sizing: border-box;
    font-weight: 500;
    user-select: none;
    text-align: center;
    white-space: nowrap;
    transition: background 0.25s ease 0s, color 0.25s ease 0s, border-color 0.25s ease 0s,
      box-shadow 0.25s ease 0s, transform 0.25s ease 0s, opacity 0.25s ease 0s;
    position: relative;
    overflow: hidden;
    border: none;
    cursor: pointer;
    pointer-events: auto;
    padding: 0px;
    border-radius: 12px;

    padding-left: 1.25rem;
    padding-right: 1.25rem;
    border-style: solid;
    min-width: min-content;
    border-width: 2px;

    &.is-disabled {
      background: #efeef0;
      color: #7e868c;
      transform: none;
      box-shadow: none;
      pointer-events: none;
    }

    &.default {
      background-color: #eceef0;
      color: #768e8c;
    }

    &.primary {
      background: transparent;
      border-color: var(--ula-colors-primary);
      color: var(--ula-colors-primary);
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      border-style: solid;
      min-width: min-content;
      border-width: 2px;
      &:hover {
        color: #fff;
        background: var(--ula-colors-primary);
      }
    }

    &.gradient {
      padding: 2px;
      background-position: initial;
      background-size: initial;
      background-repeat: initial;
      background-attachment: initial;
      background-origin: initial;
      background-color: transparent;
      color: var(--ula-color-text);
      background-clip: content-box, border-box;
      background-image: linear-gradient(#fff, #fff), var(--ula-color-gradient);
      border: none;

      &:hover {
        background: var(--ula-color-gradient);
        color: #fff;
      }

      &.is-active {
        background: var(--ula-color-gradient);
        color: #fff;
      }
    }
  }

  .ula-button-text {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    padding-left: 0.875rem;
    padding-right: 0.875rem;
    line-height: 2.5rem;

    font-size: 1rem;
    font-family: var(--ula-fonts-sans);
  }
}
</style>
