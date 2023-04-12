import path from 'node:path'
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import { checkRunning } from '../utils/check-running'
/* 
  1. Renderer: when click [start] button, send msg to Main process, Main process begin running ula.exe
  2. when running ula.exe failed, Main process use event.reply(channel, msg) send to Render
*/

interface runResult {
  status: 'running' | 'failed' | 'stopped'
  pid?: number
  msg?: string
}

const handleRunResult = ({ status, pid = undefined, msg = '' }: runResult) => ({
  status,
  pid,
  msg
})

const getUlaProcessPath = () => {
  // ula process path
  let processPath: string
  // ModPath: uipath-log-analyzer_win.exe
  const suffixPath = [path.sep, 'uipath-log-analyzer_win.exe']
  if (process.env.NODE_ENV === 'development') {
    processPath = path.join(process.cwd(), path.sep, 'resources', ...suffixPath)
  } else {
    // production */resources/ula/uipath-log-analyzer_win.exe
    processPath = path.join(process.cwd(), path.sep, 'resources', ...suffixPath)
  }

  return processPath
}

export const runUlaProcess = () => {
  const processPath = getUlaProcessPath()
  console.log('[ULA Process]: ', processPath)
  const isProcessFileExist = fs.existsSync(processPath)
  if (!isProcessFileExist) {
    return handleRunResult({
      status: 'failed',
      msg: `Error: [ULA process], ula process execution file is not found! Path: ${processPath}`
    })
  }
  try {
    // execute ULA process
    const child = spawn(processPath, { windowsHide: true })
    return handleRunResult({
      status: 'running',
      pid: child.pid
    })
  } catch (error) {
    // need error info pass to renderer
    console.log('[Electron] run ula.exe, Occurred error!!! ', error)
    // send error msg to renderer
    return handleRunResult({
      status: 'failed',
      msg: '[Electron] run ula.exe, Occurred error!!!'
    })
  }
}

export const stopRunUla = (pid: number) => {
  if (!pid) {
    return console.log('[ULA]: when stop ula, but pid is empty')
  }
  // spawn('taskkill', ['/pid', pid.toString(), '/f', '/t'])
  const res = checkRunning(pid) ? process.kill(pid) : false
  console.log(`[ULA]: whether killed ula process: ${res}`)
  return res
}
