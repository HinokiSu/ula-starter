<template>
  <div class="ula-log-line">
    <component :is="vNode"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { logToHtml } from '@utils/log-to-html'

export default defineComponent({
  name: 'UlaLogLine',
  setup() {
    return {
      vNode: logToHtml
    }
  }
})
</script>

<style lang="less">
/* if add scoped, style will not working. I currently don't know how to fix it */

@--ula-log-error-color: #f10f5e;
@--ula-log-warn-color: #faa823;
@--ula-log-info-color: #19d96c;
@--ula-log-http-color: #78e7be;
@--ula-log-verbose-color: #cbc7c7;
@--ula-log-debug-color: #9d48f3;
@--ula-log-silly-color: #9ca5ab;

.ula-log-line {
  .log-tag {
    font-size: 0.9rem;
  }
  .log-wrapper {
    .log-timestamp {
      font-size: 0.835rem;
    }
    .log-msg {
      padding-left: 0.625rem;
      font-family: var(--ula-fonts-sans);
    }

    /* error */
    &.error {
      .log-tag {
        color: @--ula-log-error-color;
      }
    }

    /* warn */
    &.warn {
      .log-tag {
        color: @--ula-log-warn-color;
      }
    }

    /* info */
    &.info {
      .log-tag {
        color: @--ula-log-info-color;
      }
    }

    /* http */
    &.http {
      .log-tag {
        color: @--ula-log-http-color;
      }
    }

    /* verbose */
    &.verbose {
      .log-tag {
        color: @--ula-log-verbose-color;
      }
    }

    /* debug */
    &.debug {
      .log-tag {
        color: @--ula-log-debug-color;
      }
    }

    /* silly */
    &.silly {
      .log-tag {
        color: @--ula-log-silly-color;
      }
    }
  }
}
</style>
