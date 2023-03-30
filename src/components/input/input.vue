<template>
  <div class="ula-input-container">
    <label class="ula-input-label">
      <input
        :readonly="readOnly"
        :disabled="disable"
        class="ula-input"
        type="text"
        v-model="inputVal"
        @input="changeValue"
      />
      <span :class="['input-placeholder', isEmpty ? 'is-empty' : 'has-value']">
        {{ placeholder }}
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UlaInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Please Input'
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const inputVal = ref('')
    const changeValue = () => {
      emit('update:value', inputVal.value)
    }
    const isEmpty = computed(() => (inputVal.value === '' ? true : false))

    return { inputVal, isEmpty, changeValue }
  }
})
</script>

<style lang="less" scoped>
.ula-input-container {
  margin: 0.25rem 0.625rem;
  height: calc(2 * 1.25rem);
}

.ula-input-label {
  --field-padding: 10px;

  position: relative;
  vertical-align: middle;
  user-select: none;
  height: 100%;

  border-radius: 0.75rem;

  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  -webkit-box-align: center;

  transition: all 0.25ms ease;

  &:hover {
    // transform: translateY(calc(0.125rem * -1));
    box-shadow: 0 2px 8px 2px rgb(104 112 118 / 0.07), 0 2px 4px -1px rgb(104 112 118 / 0.04);
  }
}

.ula-input {
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f2f2f2;
  padding: 0 0.375rem;
  outline: none;
  font-size: 0.875rem;
  height: 100%;

  background: none;
  border: 2px solid #ddd;
  transition: border-color 0.3s ease;

  border-radius: 0.75rem;

  &:hover {
    border-color: #000;
  }
}

.input-placeholder {
  position: absolute;
  padding: 0px;
  font-size: 0.825rem;
  z-index: 100;

  margin-bottom: 0px;
  cursor: text;
  transition: left 0.25s ease 0s, color 0.25s ease 0s, top 0.25s ease 0s;
  color: #737375;
  font-size: 0.82rem;
  &.is-empty {
    left: 0.9rem;
    top: 25%;
  }

  &.has-value {
    top: -50%;
    left: 0.25rem;
  }
}

.ula-input:focus + .input-placeholder.is-empty {
  top: -50%;
  left: 0.25rem;
  cursor: inherit;
  color: #555;
}
</style>
