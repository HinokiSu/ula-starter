<template>
  <div class="ula-dot-loading">
    <span aria-label="Loading" class="dot-loading">
      <i class="_1" :style="styles"></i>
      <i class="_2" :style="styles"></i>
      <i class="_3" :style="styles"></i>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import inlineStyles from '@hooks/inline-styles'

export default defineComponent({
  name: 'UlaDotLoading',
  props: {
    color: {
      type: String,
      default: '#0072f5'
    },
    gap: {
      type: String,
      default: '2px'
    }
  },
  setup(props) {
    const styles = inlineStyles({
      background: props.color,
      'margin-left': props.gap,
      'margin-right': props.gap
    })

    return {
      styles
    }
  }
})
</script>

<style lang="less" scoped>
@--ula-loadingSize: 0.375rem;

.ula-dot-loading {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.dot-loading {
  display: flex;
  position: relative;
  transform: translate(0, -3px);
  i {
    width: @--ula-loadingSize;
    height: @--ula-loadingSize;
    // margin: 0px 2px;
    // background: #0072f5;
    background: inherit;
  }
  ._1 {
    border-radius: 50%;
    animation: 0.75s ease 0s infinite normal none running ula-points;
  }
  ._2 {
    border-radius: 50%;
    animation: 0.75s ease 0.25s infinite normal none running ula-points;
  }

  ._3 {
    border-radius: 50%;
    animation: 0.75s ease 0.5s infinite normal none running ula-points;
  }

  @keyframes ula-points {
    0% {
      transform: translate(0px, 0px);
      opacity: 0.2;
    }
    50% {
      transform: translate(0, calc(@--ula-loadingSize * 1.4));
      opacity: 0.5;
    }
    100% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
  }
}
</style>
