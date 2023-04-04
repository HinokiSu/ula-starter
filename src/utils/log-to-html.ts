/*
  {
    level: 'info',
    message: 'Hit CTRL-C to stop the server',
    service: 'ula-server',
    timestamp: '2023-03-28 16:41:41.686'
  }
*/
/* to */
/* 
  <p><span>▲ ~ </span># Hyper is an Electron-based terminal</p>
  <p><span>▲ ~ </span># Built on HTML/CSS/JS</p>
*/

import { computed, h, ref, VNode } from 'vue'
import { TLogItem } from '../interfaces/log-type'
import { useLogStore } from '@stores/log-store'

/**
 * create whole log vNode
 * @returns VNode
 */
export const logToHtml = () => {
  const logStore = useLogStore()
  const logListRef = computed(() => logStore.logList)

  const child = ref<VNode[]>([])
  for (const item of logListRef.value) {
    child.value.push(logObjToHtml(item))
  }
  return h('div', child.value)
}


/**
 * 
 * @param obj log obj item
 * @returns single child log vNode
 */
export const logObjToHtml = (obj: TLogItem) => {
  /* let originHtml: string
  originHtml = `<p>▲ ~ `
  originHtml += `<span class="tag-${obj.level}">${obj.level}</span><span class="${obj.level}-body"}>[${obj.timestamp}]</span><span>${obj.message}</span><span>`
  originHtml += `</p>` */

  const logTag = h('span', { class: `log-tag` }, [`[${obj.level}]`])
  const logTimestamp = h('span', { class: `log-timestamp` }, [`[${obj.timestamp}]:`])
  const logMsg = h('span', { class: `log-msg` }, [obj.message])
  const vNode = h('p', { class: `log-wrapper ${obj.level}` }, [`▲ ~`, logTag, logTimestamp, logMsg])

  return vNode
}
