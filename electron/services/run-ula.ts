import path from 'node:path'
import { execFile } from 'node:child_process'
import fs from 'node:fs'
import { ChildProcess } from 'child_process'
/* 
  1. Renderer: when click [start] button, send msg to Main process, Main process begin running ula.exe
  2. when running ula.exe failed, Main process use event.reply(channel, msg) send to Render
*/

interface runResult {
  status: 'running' | 'failed' | 'stopped'
  msg: string
}

export default class UlaProcess {
  child: ChildProcess
  constructor() {}

  runUlaProcess(): runResult {
    // ula process path
    const runResult: runResult = {
      status: 'stopped',
      msg: ''
    }
    const processPath = path.join(
      process.cwd(),
      path.sep,
      'ula',
      path.sep,
      'uipath-log-analyzer_win.exe'
    )
    console.log('[ULA process]: ', processPath)
    const isProcessFileExist = fs.existsSync(processPath)
    if (!isProcessFileExist) {
      runResult.status = 'failed'
      runResult.msg = `Error: [ULA process], ula process execution file is not found! Path: ${processPath}`
      return runResult
    }
    try {
      this.child = execFile(processPath)
      runResult.status = 'running'
      runResult.msg = ''
    } catch (error) {
      // need error info pass to renderer
      console.log('[Electron] run ula.exe, Occurred error!!! ', error)
      // send error msg to renderer
      runResult.status = 'failed'
      runResult.msg = '[Electron] run ula.exe, Occurred error!!!'
    } finally {
      return runResult
    }
  }

  stopRunUla() {
    const res = process.kill(this.child.pid)
    console.log(`[ULA]: whether killed ula process: ${res}`)
    return res
  }
}
