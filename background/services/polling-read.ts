/* import fsp from 'fs/promises'
import fs from 'fs' */
// import path from 'path'
// let sleep = require('util').promisify(setTimeout)
// const fs = require('fs').promises
import { sleep } from '../utils/sleep'
import { nodeAPI } from '../api/electron-api'
type TLogItem = {
  timestamp: string
  level: string
  message: string
  service: string
}

type TReply = {
  /* -1: error, 0: null data, 1: valuable data */
  flag: boolean
  msg: string
  data: Array<TLogItem> | []
}

const handleReply = ({ flag, msg = '', data = [] }): TReply => ({
  flag,
  msg,
  data
})

/**
 * polling read logger file
 */
export const pollingRead = async (cb: any, stop = false) => {
  const sep = nodeAPI.pathSep()
  const cwd = nodeAPI.processCwd()

  const logPath = await nodeAPI.pathJoin([cwd, sep, 'ula', sep, 'logger', sep, 'ula_execution.log'])
  // check logger file exist
  let isExist = await nodeAPI.fsExistsSync(logPath)
  for (let i = 0; i < 3; i++) {
    if (!isExist) {
      sleep(1000)
      // check again
      isExist = await nodeAPI.fsExistsSync(logPath)
    } else {
      break
    }
  }
  if (!isExist) {
    console.log('[ULA Log]: file is not found')
    return handleReply({
      flag: false,
      msg: '[ULA Log]: logger file is not found'
    })
  }
  const fileStats = await nodeAPI.fspStat(logPath)
  let oldModTime = fileStats.mtimeMs

  while (true) {
    let _oldLogTimestamp: string = ''
    const latestFileStats = await nodeAPI.fspStat(logPath)
    const latestModTime = latestFileStats.mtimeMs

    if (latestModTime > oldModTime) {
      // update old modify time
      let filteredData: TLogItem[] | []
      const logData = await readLogFile(logPath)

      filteredData = logData.filter((_item) => {
        // filter old log, return new value
        if (_item.timestamp > _oldLogTimestamp) {
          return true
        } else {
          return false
        }
      })
      console.log(filteredData.length)
      if (filteredData.length !== 0) {
        // update oldLogTimestamp temp value
        _oldLogTimestamp = filteredData[filteredData.length - 1].timestamp
        cb(
          handleReply({
            flag: true,
            data: filteredData
          })
        )
      }
      filteredData = null
      oldModTime = latestModTime
    }

    // delay
    await sleep(1000)
  }
}

export const readLogFile = async (logPath: string): Promise<TLogItem[]> => {
  // read
  // let logStr = await fsp.readFile(logPath, 'utf8')
  let logStr = await nodeAPI.fspReadFile(logPath, 'utf8')
  const logArr = logStr.trimEnd().split('\n')

  if (logStr === '') return []
  // use comma to separate
  const _str = logArr.join(',')
  /* 
   logger file item
   {"level":"info","message":"Web: http://localhost:4301","service":"ula-server","timestamp":"2023-03-20 14:59:05.636"}
   {"level":"info","message":"Server: http://localhost:4302","service":"ula-server","timestamp":"2023-03-20 14:59:05.671"}
   */
  // parse
  const logJson = JSON.parse('[' + _str + ']') as TLogItem[]
  return logJson
}