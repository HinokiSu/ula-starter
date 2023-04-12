import path from 'node:path'
import fs from 'node:fs'
import { BrowserWindow, dialog, ipcMain } from 'electron'

type TUlaConfig = {
  UIPATH_LOGS_FOLDER_PATH: string
  CLIENT_PORT: string
  SERVER_PORT: string
}

type TModConfigRes = {
  state: boolean
  msg?: string
  config?: string
}

const getUlaConfigPath = () => {
  const suffixPath = ['ula', path.sep, 'server.config.json']
  // production */resources/ula/ula/server
  // ModPath: server.config.json
  return process.env.NODE_ENV === 'development'
    ? path.join(process.cwd(), path.sep, 'resources', path.sep, ...suffixPath)
    : path.join(process.cwd(), path.sep, 'resources', path.sep, ...suffixPath)
}

const readUlaConfig = (configPath: string): TUlaConfig | string => {
  if (!fs.existsSync(configPath)) {
    // return to Render,
    return 'Error: [Ula] config file is not found!'
  }
  const config = fs.readFileSync(configPath, 'utf-8')
  if (config === '') {
    return 'Warn: [Ula] config file is empty!'
  }
  const configJson = JSON.parse(config) as TUlaConfig
  return configJson
}

const setNewLogDirFromConfig = (logDir: string, config: TUlaConfig, configPath: string) => {
  // modify uipath log path
  config.UIPATH_LOGS_FOLDER_PATH = logDir
  // rewrite ula config file
  const configStr = JSON.stringify(config)
  try {
    fs.writeFileSync(configPath, configStr, 'utf-8')
  } catch (error) {
    return `[ULA Config]: modify ula config failed!`
  }
}

export const getOldLogDirFromConfig = (): TModConfigRes => {
  const configPath = getUlaConfigPath()
  console.log('[ULA Config]: ', configPath)
  const config = readUlaConfig(configPath)
  // appear error
  if (typeof config === 'string')
    return {
      state: false,
      msg: config
    }

  // get exist log dir path from config
  const oldLogDir = config.UIPATH_LOGS_FOLDER_PATH
  if (oldLogDir === '')
    return {
      state: false,
      msg: `[ULA Config]: UIPATH_LOGS_FOLDER_PATH value is empty! Please choose uipath log directory`
    }

  return { state: true, config: oldLogDir }
}

export const modifyUlaConfig = (logPath: string): TModConfigRes => {
  // ula process config file path
  const ulaConfigPath = getUlaConfigPath()
  console.log('[ULA] config path: ', ulaConfigPath)

  const config = readUlaConfig(ulaConfigPath)
  // appear error
  if (typeof config === 'string')
    return {
      state: false,
      msg: config
    }

  const setRes = setNewLogDirFromConfig(logPath, config, ulaConfigPath)
  if (setRes)
    return {
      state: false,
      msg: setRes
    }

  return {
    state: true,
    config: logPath
  }
}

export const pickLogDir = (win: BrowserWindow) => {
  async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: 'Choose Folder',
      properties: ['openDirectory']
    })
    if (canceled || filePaths.length < 1)
      return {
        state: false,
        msg: 'Cancelled pick directory...'
      }

    const logDir = filePaths[0]
    // modify ula config, rewrite uipath log dir in config
    return modifyUlaConfig(logDir)
  }
  ipcMain.handle('pick-log-dirs', handleFileOpen)
}
